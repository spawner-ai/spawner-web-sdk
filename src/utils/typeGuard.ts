import type { ChannelController } from '@/proto/packets/channel/v1/channel_pb'
import type { InputFilterEvent } from '@/proto/packets/input_filter/v1/input_filter_pb'
import type { EmotionEvent } from '@/proto/packets/emotion/v1/emotion_pb'
import type { KnowledgeEvent } from '@/proto/packets/knowledge/v1/knowledge_pb'
import type { SentimentEvent } from '@/proto/packets/sentiment/v1/sentiment_pb'
import type { PromptInjectionEvent } from '@/proto/packets/prompt_injection/v1/prompt_injection_pb'
import type { WorldController } from '@/proto/packets/world/v1/world_pb'
import type { AgentController } from '@/proto/packets/agent/v1/agent_pb'
import type { SpawnerPacket } from '@/proto/packet/v1/packet_pb'
import type { TextEvent } from '@/proto/packet_components/text/v1/text_pb'

type PayloadCase<T> = { case: string, value: T }

type PayloadMapping = {
  channelController: ChannelController
  inputFilter: InputFilterEvent
  emotion: EmotionEvent
  knowledge: KnowledgeEvent
  sentiment: SentimentEvent
  promptInjection: PromptInjectionEvent
  worldController: WorldController
  agentController: AgentController
  text: TextEvent
}

type UndefinedCase = { case: undefined, value?: undefined }

// 型ガードの汎用関数
function isPayloadCase<K extends keyof PayloadMapping>(
  payload: unknown,
  caseKey: K,
): payload is PayloadCase<PayloadMapping[K]> {
  return (
    typeof payload === 'object'
    && payload !== null
    && (payload as PayloadCase<PayloadMapping[K]>).case === caseKey
    && typeof (payload as PayloadCase<PayloadMapping[K]>).value === 'object'
    && (payload as PayloadCase<PayloadMapping[K]>).value !== null
  )
}

// 個別の型ガード関数
function isUndefinedCase(payload: unknown): payload is UndefinedCase {
  return (
    typeof payload === 'object'
    && payload !== null
    && (payload as UndefinedCase).case === undefined
  )
}

// スポーンパケット型ガード関数
export const isSpawnerPacket = (message: unknown): message is SpawnerPacket => {
  if (typeof message !== 'object' || message === null) return false

  const payload = (message as SpawnerPacket).payload

  return (
    isPayloadCase(payload, 'channelController')
    || isPayloadCase(payload, 'inputFilter')
    || isPayloadCase(payload, 'emotion')
    || isPayloadCase(payload, 'knowledge')
    || isPayloadCase(payload, 'sentiment')
    || isPayloadCase(payload, 'promptInjection')
    || isPayloadCase(payload, 'worldController')
    || isPayloadCase(payload, 'agentController')
    || !isUndefinedCase(payload)
  )
}
