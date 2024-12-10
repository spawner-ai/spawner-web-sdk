import type {
  InputFilterEvent as ProtoInputFilterEvent,
  InputFilterMatch as ProtoInputFilterMatch,
} from '../../../proto/spawner/input_filter/v1/input_filter_pb'
import { InputFilterType as ProtoInputFilterType } from '../../../proto/spawner/input_filter/v1/input_filter_pb'

enum InputFilterType {
  UNSPECIFIED = 'UNSPECIFIED',
  MODERATION = 'MODERATION',
  CUSTOM = 'CUSTOM',
}

interface InputFilterMatchProps {
  label: string
  text: string
}

class InputFilterMatch {
  readonly label: string
  readonly text: string

  constructor(props: InputFilterMatchProps) {
    this.label = props.label
    this.text = props.text
  }

  static convertProto(proto: ProtoInputFilterMatch) {
    return new InputFilterMatch({
      label: proto.label,
      text: proto.text,
    })
  }
}

interface InputFilterEventProps {
  type: InputFilterType
  utteranceId: string
  isFlagged: boolean
  matches: InputFilterMatch[]
}

export class InputFilterEvent {
  readonly type: InputFilterType = InputFilterType.UNSPECIFIED
  readonly utteranceId: string
  readonly isFlagged: boolean
  readonly matches: InputFilterMatch[]

  constructor(props: InputFilterEventProps) {
    const { type, utteranceId, isFlagged, matches } = props
    this.type = type
    this.utteranceId = utteranceId
    this.isFlagged = isFlagged
    this.matches = matches
  }

  static convertProto(proto: ProtoInputFilterEvent) {
    const type = InputFilterEvent.getType(proto)
    const { utteranceId, isFlagged, matches } = proto
    return new InputFilterEvent({
      type,
      utteranceId,
      isFlagged,
      matches: matches.map(m => InputFilterMatch.convertProto(m)),
    })
  }

  private static getType(proto: ProtoInputFilterEvent) {
    const { type } = proto
    switch (type) {
      case ProtoInputFilterType.MODERATION:
        return InputFilterType.MODERATION
      case ProtoInputFilterType.CUSTOM:
        return InputFilterType.CUSTOM
      default:
        return InputFilterType.UNSPECIFIED
    }
  }
}
