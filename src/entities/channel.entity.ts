import type { ChannelController } from '../../proto/spawner/channel/v1/channel_pb'
import { Character } from './character.entity'
import { Player } from './player.entity'

interface HostProps {
  sessionId?: string
}

class Host {
  sessionId?: string

  constructor(props: HostProps) {
    this.sessionId = props.sessionId
  }
}

interface Member {
  sessionId: string
}

interface Actor {
  players: Player[]
  characters: Character[]
}

export interface ChannelProps {
  id: string
  host: Host
  members: Member[]
  actor: Actor
}

export class Channel {
  readonly id: string
  readonly host: Host
  readonly members: Member[]
  readonly actor: Actor

  constructor(props: ChannelProps) {
    const { id, host, members, actor } = props
    this.id = id
    this.host = host
    this.members = members
    this.actor = actor
  }

  static convertProto(proto: ChannelController) {
    const { channelId, host, members, actor } = proto
    return new Channel({
      id: channelId,
      host: new Host({ sessionId: host?.sessionId }),
      members: members.map(member => ({ sessionId: member.sessionId })),
      actor: {
        players: actor?.players.map(player => Player.convertProto(player)) ?? [],
        characters: actor?.agents.map(agent => Character.convertProto(agent)) ?? [],
      },
    })
  }
}
