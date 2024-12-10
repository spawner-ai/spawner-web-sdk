import {
  type ChannelController as ProtoChannelController,
  ChannelControllerType as ProtoChannelControllerType,
  type ChannelHost as ProtoChannelHost,
  type ChannelMember as ProtoChannelMember,
} from '../../../proto/spawner/channel/v1/channel_pb'
import { Actor } from './actor.entity'

enum ChannelControllerType {
  UNSPECIFIED = 'UNSPECIFIED',
  CREATE = 'CREATE',
  LEAVE = 'LEAVE',
}

interface ChannelHostProps {
  sessionId: string
}

class ChannelHost {
  readonly sessionId: string

  constructor(props: ChannelHostProps) {
    this.sessionId = props.sessionId
  }

  static convertProto(proto: ProtoChannelHost) {
    return new ChannelHost({
      sessionId: proto.sessionId,
    })
  }
}

interface ChannelMemberProps {
  sessionId: string
}

class ChannelMember {
  readonly sessionId: string

  constructor(props: ChannelMemberProps) {
    this.sessionId = props.sessionId
  }

  static convertProto(proto: ProtoChannelMember) {
    return new ChannelMember({
      sessionId: proto.sessionId,
    })
  }
}

interface ChannelControllerProps {
  type: ChannelControllerType
  channelId: string
  host?: ChannelHost
  members: ChannelMember[]
  actor?: Actor
}

export class ChannelController {
  private type: ChannelControllerType = ChannelControllerType.UNSPECIFIED
  readonly channelId: string
  readonly host?: ChannelHost
  readonly members: ChannelMember[]
  readonly actor?: Actor

  constructor(props: ChannelControllerProps) {
    const { type, channelId, host, members, actor } = props
    this.type = type
    this.channelId = channelId
    this.host = host
    this.members = members
    this.actor = actor
  }

  static convertProto(proto: ProtoChannelController) {
    const type = ChannelController.getType(proto)
    const { channelId, host, members, actor } = proto
    return new ChannelController({
      type,
      channelId,
      host: host && ChannelHost.convertProto(host),
      members: members.map(m => ChannelMember.convertProto(m)),
      actor: actor && Actor.convertProto(actor),
    })
  }

  private static getType(proto: ProtoChannelController) {
    const { type } = proto
    switch (type) {
      case ProtoChannelControllerType.CREATE:
        return ChannelControllerType.CREATE
      case ProtoChannelControllerType.LEAVE:
        return ChannelControllerType.LEAVE
      default:
        return ChannelControllerType.UNSPECIFIED
    }
  }
}
