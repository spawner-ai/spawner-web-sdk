import type {
  InputFilterEvent as ProtoInputFilterEvent,
  InputFilterMatch as ProtoInputFilterMatch,
} from '@/proto/packets/input_filter/v1/input_filter_pb'

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
  utteranceId: string
  isFlagged: boolean
  matches: InputFilterMatch[]
}

export class InputFilterEvent {
  readonly utteranceId: string
  readonly isFlagged: boolean
  readonly matches: InputFilterMatch[]

  constructor(props: InputFilterEventProps) {
    const { utteranceId, isFlagged, matches } = props

    this.utteranceId = utteranceId
    this.isFlagged = isFlagged
    this.matches = matches
  }

  static convertProto(proto: ProtoInputFilterEvent) {
    const { utteranceId, isFlagged, matches } = proto
    return new InputFilterEvent({
      utteranceId,
      isFlagged,
      matches: matches.map(m => InputFilterMatch.convertProto(m)),
    })
  }
}
