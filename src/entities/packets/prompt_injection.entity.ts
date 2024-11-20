import { 
  PromptInjectionEvent as ProtoPromptInjectionEvent,
  PromptInjectionDetectorResult as ProtoPromptInjectionDetectorResult
 } from '../../../proto/spawner/prompt_injection/v1/prompt_injection_pb'

interface PromptInjectionDetectorResultProps {
  jailbreak: number;
  roleplay: number;
  code: number;
}
class PromptInjectionDetectorResult {
  readonly jailbreak: number;
  readonly roleplay: number;
  readonly code: number;

  constructor(props: PromptInjectionDetectorResultProps) {
    const { jailbreak, roleplay, code } = props;
    this.jailbreak = jailbreak;
    this.roleplay = roleplay;
    this.code = code;
  }

  static convertProto(proto: ProtoPromptInjectionDetectorResult) {
    const { jailbreak, roleplay, code } = proto;
    return new PromptInjectionDetectorResult({
      jailbreak,
      roleplay,
      code
    })
  }
}

interface PromptInjectionEventProps {
  utteranceId: string
  isFlagged: boolean
  result?: PromptInjectionDetectorResult
}

export class PromptInjectionEvent {
  readonly utteranceId: string;
  readonly isFlagged: boolean;
  readonly result?: PromptInjectionDetectorResult

  constructor(props: PromptInjectionEventProps) {
    this.utteranceId = props.utteranceId
    this.isFlagged = props.isFlagged
    this.result = props.result
  }

  static convertProto(proto: ProtoPromptInjectionEvent) {
    const { utteranceId, isFlagged, result } = proto

    return new PromptInjectionEvent({
      utteranceId,
      isFlagged,
      result: result && PromptInjectionDetectorResult.convertProto(result)
    })
  }

}
