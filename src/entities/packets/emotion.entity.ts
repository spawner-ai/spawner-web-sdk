import {
  EmotionResult,
  type EmotionEvent as ProtoEmotion,
  type EmotionScore as ProtoEmotionScore,
} from '../../../proto/spawner/emotion/v1/emotion_pb'

enum EmotionType {
  UNSPECIFIED = 'UNSPECIFIED',
  NEUTRAL = 'NEUTRAL',
  JOY = 'JOY',
  SADNESS = 'SADNESS',
  ANGER = 'ANGER',
  FEAR = 'FEAR',
  DISGUST = 'DISGUST',
  SURPRISE = 'SURPRISE',
}
interface EmotionScoreProps {
  joy: number
  sadness: number
  anger: number
  fear: number
  disgust: number
  surprise: number
}

class EmotionScore {
  readonly joy: number
  readonly sadness: number
  readonly anger: number
  readonly fear: number
  readonly disgust: number
  readonly surprise: number

  constructor(props: EmotionScoreProps) {
    const { joy, sadness, anger, fear, disgust, surprise } = props
    this.joy = joy
    this.sadness = sadness
    this.anger = anger
    this.fear = fear
    this.disgust = disgust
    this.surprise = surprise
  }

  static convertProto(proto: ProtoEmotionScore) {
    const { joy, sadness, anger, fear, disgust, surprise } = proto
    return new EmotionScore({
      joy,
      sadness,
      anger,
      fear,
      disgust,
      surprise,
    })
  }
}

interface EmotionProps {
  utteranceId: string
  result: EmotionType
  score?: EmotionScore
}

export class EmotionEvent {
  readonly utteranceId: string
  readonly result: EmotionType = EmotionType.UNSPECIFIED
  readonly score?: EmotionScore

  constructor(props: EmotionProps) {
    const { utteranceId, result, score } = props
    this.utteranceId = utteranceId
    this.result = result
    this.score = score
  }

  static convertProto(proto: ProtoEmotion) {
    const { utteranceId, score } = proto
    const result = EmotionEvent.getType(proto)
    return new EmotionEvent({
      utteranceId,
      result,
      score: score && EmotionScore.convertProto(score),
    })
  }

  private static getType(proto: ProtoEmotion) {
    const { result } = proto
    switch (result) {
      case EmotionResult.NEUTRAL:
        return EmotionType.NEUTRAL
      case EmotionResult.JOY:
        return EmotionType.JOY
      case EmotionResult.SADNESS:
        return EmotionType.SADNESS
      case EmotionResult.ANGER:
        return EmotionType.ANGER
      case EmotionResult.FEAR:
        return EmotionType.FEAR
      case EmotionResult.DISGUST:
        return EmotionType.DISGUST
      case EmotionResult.SURPRISE:
        return EmotionType.SURPRISE
      default:
        return EmotionType.UNSPECIFIED
    }
  }
}
