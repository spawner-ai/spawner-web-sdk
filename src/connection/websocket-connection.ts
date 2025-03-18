import { Awaitable, ConnectionError } from '../common/types'
import { SpawnerPacket as ProtoPacket } from '@/proto/packet/v1/packet_pb'
import { SpawnerPacket } from '../entities/packets/spawner_packet.entity'
import { SessionToken } from '../entities/session_token.entity'
import { isSpawnerPacket } from '../utils/typeGuard'
const WEBSOCKET_HOSTNAME = 'localhost:8000'
const END_POINT = '/v1/connect'

export interface WebSocketProps {
  onOpen?: () => Awaitable<void>
  onMessage?: (packet: SpawnerPacket) => Awaitable<void>
  onError?: (err: ConnectionError) => Awaitable<void>
  onClose?: () => Awaitable<void>
}

interface StreamProps {
  session: SessionToken
  onClose?: () => Awaitable<void>
  onError?: (err: ConnectionError) => Awaitable<void>
  onMessage?: (packet: SpawnerPacket) => Awaitable<void>
  onOpen?: () => Awaitable<void>
}

interface OpenConnectionProps {
  session: SessionToken
}
export class Connection {
  private connectionProps: WebSocketProps
  private ws: WebSocket | null
  private previousSentPacket: ProtoPacket | undefined

  constructor(props: WebSocketProps) {
    this.connectionProps = props
    this.ws = null
  }

  isActive() {
    return this.ws?.readyState === WebSocket.OPEN
  }

  async open({
    session,
  }: OpenConnectionProps) {
    const { onOpen, onMessage, onError, onClose } = this.connectionProps
    this.ws = this.createWebSocket({
      session,
      onOpen,
      onMessage,
      onError,
      onClose,
    })
  }

  write(packet: ProtoPacket) {
    this.previousSentPacket = packet
    if (this.isActive()) {
      this.ws?.send(JSON.stringify(packet))
    }
    else {
      console.log('socket connection is not open')
    }
  }

  private createWebSocket(props: StreamProps) {
    const { session, onOpen, onClose, onError } = props

    const url = `ws://${WEBSOCKET_HOSTNAME}${END_POINT}?session_id=${session.sessionId}&token=${session.token}`

    const ws = new WebSocket(url)

    if (onOpen) {
      ws.addEventListener('open', () => onOpen())
    }

    ws.addEventListener('message', event => this.onMessage(event))

    if (onClose) {
      ws.addEventListener('close', () => onClose())
    }

    if (onError) {
      ws.addEventListener('error', err => onError(err))
    }

    return ws
  }

  close() {
    if (this.connectionProps.onError) {
      this.ws?.removeEventListener('error', this.connectionProps.onError)
    }

    if (this.connectionProps.onClose) {
      this.ws?.removeEventListener('close', this.connectionProps.onClose)
    }
    if (this.connectionProps.onOpen) {
      this.ws?.removeEventListener('open', this.connectionProps.onOpen)
    }

    this.ws?.removeEventListener('message', this.onMessage)

    if (this.isActive() && this.ws) {
      this.ws.close()
      this.connectionProps.onClose?.()
    }

    this.ws = null
  }

  private onMessage(event: MessageEvent) {
    const { onError, onMessage } = this.connectionProps
    const payload = JSON.parse(event.data)

    if (isSpawnerPacket(payload)) {
      if ((payload.error) && onError) {
        onError(payload.error)
      }
      if (!payload.error && onMessage) {
        if (payload != this.previousSentPacket) {
          const packet = SpawnerPacket.convertProto(payload)
          onMessage(packet)
        }
      }
    }
    else {
      if ((payload.error) && onError) {
        onError(payload.error)
      }
    }
  }
}
