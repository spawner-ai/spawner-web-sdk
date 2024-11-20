import { 
  SentimentEvent as ProtoSentimentEvent,
  SentimentResult as ProtoSentimentResult
 } from '../../../proto/spawner/sentiment/v1/sentiment_pb'

enum SentimentResult {
  UNSPECIFIED = 'UNSPECIFIED',
  NEUTRAL = 'NEUTRAL',
  POSITIVE = 'POSITIVE',
  NEGATIVE = 'NEGATIVE',
}

interface SentimentEventProps {
  utteranceId: string
  result: SentimentResult
  score: number
}

export class SentimentEvent {
  readonly utteranceId: string
  readonly result: SentimentResult = SentimentResult.UNSPECIFIED
  readonly score: number

  constructor(props: SentimentEventProps) {
    this.utteranceId = props.utteranceId
    this.score = props.score
  }

  static convertProto(proto: ProtoSentimentEvent) {
    const { utteranceId, score } = proto
    const result = SentimentEvent.getType(proto)

    return new SentimentEvent({
      utteranceId,
      result,
      score
    })
  }

  private static getType(proto: ProtoSentimentEvent): SentimentResult {
    const { result } = proto

    switch (result) {
			case ProtoSentimentResult.NEUTRAL:
				return SentimentResult.NEUTRAL;
			case ProtoSentimentResult.POSITIVE:
				return SentimentResult.POSITIVE;
      case ProtoSentimentResult.NEGATIVE:
				return SentimentResult.NEGATIVE;
			default:
				return SentimentResult.UNSPECIFIED;
		}
  }
}
