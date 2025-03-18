// @generated by protoc-gen-es v2.2.2 with parameter "target=ts"
// @generated from file spawner/packet_components/prompt_injection/v1/prompt_injection.proto (package spawner.packet_components.prompt_injection.v1, syntax proto3)
/* eslint-disable */

import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv1";
import { fileDesc, messageDesc } from "@bufbuild/protobuf/codegenv1";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file spawner/packet_components/prompt_injection/v1/prompt_injection.proto.
 */
export const file_spawner_packet_components_prompt_injection_v1_prompt_injection: GenFile = /*@__PURE__*/
  fileDesc("CkRzcGF3bmVyL3BhY2tldF9jb21wb25lbnRzL3Byb21wdF9pbmplY3Rpb24vdjEvcHJvbXB0X2luamVjdGlvbi5wcm90bxItc3Bhd25lci5wYWNrZXRfY29tcG9uZW50cy5wcm9tcHRfaW5qZWN0aW9uLnYxIlIKHVByb21wdEluamVjdGlvbkRldGVjdG9yUmVzdWx0EhEKCWphaWxicmVhaxgBIAEoAhIQCghyb2xlcGxheRgCIAEoAhIMCgRjb2RlGAMgASgCIp4BChRQcm9tcHRJbmplY3Rpb25FdmVudBIUCgx1dHRlcmFuY2VfaWQYASABKAkSEgoKaXNfZmxhZ2dlZBgCIAEoCBJcCgZyZXN1bHQYAyABKAsyTC5zcGF3bmVyLnBhY2tldF9jb21wb25lbnRzLnByb21wdF9pbmplY3Rpb24udjEuUHJvbXB0SW5qZWN0aW9uRGV0ZWN0b3JSZXN1bHRCmAIKMWNvbS5zcGF3bmVyLnBhY2tldF9jb21wb25lbnRzLnByb21wdF9pbmplY3Rpb24udjFCFFByb21wdEluamVjdGlvblByb3RvUAGiAgNTUFCqAitTcGF3bmVyLlBhY2tldENvbXBvbmVudHMuUHJvbXB0SW5qZWN0aW9uLlYxygIrU3Bhd25lclxQYWNrZXRDb21wb25lbnRzXFByb21wdEluamVjdGlvblxWMeICN1NwYXduZXJcUGFja2V0Q29tcG9uZW50c1xQcm9tcHRJbmplY3Rpb25cVjFcR1BCTWV0YWRhdGHqAi5TcGF3bmVyOjpQYWNrZXRDb21wb25lbnRzOjpQcm9tcHRJbmplY3Rpb246OlYxYgZwcm90bzM");

/**
 * @generated from message spawner.packet_components.prompt_injection.v1.PromptInjectionDetectorResult
 */
export type PromptInjectionDetectorResult = Message<"spawner.packet_components.prompt_injection.v1.PromptInjectionDetectorResult"> & {
  /**
   * @generated from field: float jailbreak = 1;
   */
  jailbreak: number;

  /**
   * @generated from field: float roleplay = 2;
   */
  roleplay: number;

  /**
   * @generated from field: float code = 3;
   */
  code: number;
};

/**
 * Describes the message spawner.packet_components.prompt_injection.v1.PromptInjectionDetectorResult.
 * Use `create(PromptInjectionDetectorResultSchema)` to create a new message.
 */
export const PromptInjectionDetectorResultSchema: GenMessage<PromptInjectionDetectorResult> = /*@__PURE__*/
  messageDesc(file_spawner_packet_components_prompt_injection_v1_prompt_injection, 0);

/**
 * Represents a prompt injection detection result.
 *
 * @generated from message spawner.packet_components.prompt_injection.v1.PromptInjectionEvent
 */
export type PromptInjectionEvent = Message<"spawner.packet_components.prompt_injection.v1.PromptInjectionEvent"> & {
  /**
   * Identifies a grouping of multiple packages.
   *
   * @generated from field: string utterance_id = 1;
   */
  utteranceId: string;

  /**
   * `True` if prompt injection has been detected.
   *
   * @generated from field: bool is_flagged = 2;
   */
  isFlagged: boolean;

  /**
   * @generated from field: spawner.packet_components.prompt_injection.v1.PromptInjectionDetectorResult result = 3;
   */
  result?: PromptInjectionDetectorResult;
};

/**
 * Describes the message spawner.packet_components.prompt_injection.v1.PromptInjectionEvent.
 * Use `create(PromptInjectionEventSchema)` to create a new message.
 */
export const PromptInjectionEventSchema: GenMessage<PromptInjectionEvent> = /*@__PURE__*/
  messageDesc(file_spawner_packet_components_prompt_injection_v1_prompt_injection, 1);

