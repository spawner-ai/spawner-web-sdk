// @generated by protoc-gen-es v2.2.2 with parameter "target=ts"
// @generated from file spawner/packet_components/behavior/v1/behavior.proto (package spawner.packet_components.behavior.v1, syntax proto3)
/* eslint-disable */

import type { GenEnum, GenFile, GenMessage } from "@bufbuild/protobuf/codegenv1";
import { enumDesc, fileDesc, messageDesc } from "@bufbuild/protobuf/codegenv1";
import type { DomainAction } from "../../domain/v1/domain_pb";
import { file_spawner_packet_components_domain_v1_domain } from "../../domain/v1/domain_pb";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file spawner/packet_components/behavior/v1/behavior.proto.
 */
export const file_spawner_packet_components_behavior_v1_behavior: GenFile = /*@__PURE__*/
  fileDesc("CjRzcGF3bmVyL3BhY2tldF9jb21wb25lbnRzL2JlaGF2aW9yL3YxL2JlaGF2aW9yLnByb3RvEiVzcGF3bmVyLnBhY2tldF9jb21wb25lbnRzLmJlaGF2aW9yLnYxIr8BCg1CZWhhdmlvckV2ZW50ElUKDHJlcXVlc3RfdHlwZRgBIAEoDjI/LnNwYXduZXIucGFja2V0X2NvbXBvbmVudHMuYmVoYXZpb3IudjEuQmVoYXZpb3JFdmVudFJlcXVlc3RUeXBlEhQKCGFnZW50X2lkGAIgASgJQgIYARJBCgZhY3Rpb24YAyABKAsyMS5zcGF3bmVyLnBhY2tldF9jb21wb25lbnRzLmRvbWFpbi52MS5Eb21haW5BY3Rpb24qbQoYQmVoYXZpb3JFdmVudFJlcXVlc3RUeXBlEisKJ0JFSEFWSU9SX0VWRU5UX1JFUVVFU1RfVFlQRV9VTlNQRUNJRklFRBAAEiQKIEJFSEFWSU9SX0VWRU5UX1JFUVVFU1RfVFlQRV9TVEVQEAFC7QEKKWNvbS5zcGF3bmVyLnBhY2tldF9jb21wb25lbnRzLmJlaGF2aW9yLnYxQg1CZWhhdmlvclByb3RvUAGiAgNTUEKqAiRTcGF3bmVyLlBhY2tldENvbXBvbmVudHMuQmVoYXZpb3IuVjHKAiRTcGF3bmVyXFBhY2tldENvbXBvbmVudHNcQmVoYXZpb3JcVjHiAjBTcGF3bmVyXFBhY2tldENvbXBvbmVudHNcQmVoYXZpb3JcVjFcR1BCTWV0YWRhdGHqAidTcGF3bmVyOjpQYWNrZXRDb21wb25lbnRzOjpCZWhhdmlvcjo6VjFiBnByb3RvMw", [file_spawner_packet_components_domain_v1_domain]);

/**
 * @generated from message spawner.packet_components.behavior.v1.BehaviorEvent
 */
export type BehaviorEvent = Message<"spawner.packet_components.behavior.v1.BehaviorEvent"> & {
  /**
   * Input only. Indicates the type of request sent to the server.
   *
   * @generated from field: spawner.packet_components.behavior.v1.BehaviorEventRequestType request_type = 1;
   */
  requestType: BehaviorEventRequestType;

  /**
   * @generated from field: string agent_id = 2 [deprecated = true];
   * @deprecated
   */
  agentId: string;

  /**
   * Output only. Indicates the action selected by the agent. The action is
   * selected from an affordance within the environment domain.
   *
   * @generated from field: spawner.packet_components.domain.v1.DomainAction action = 3;
   */
  action?: DomainAction;
};

/**
 * Describes the message spawner.packet_components.behavior.v1.BehaviorEvent.
 * Use `create(BehaviorEventSchema)` to create a new message.
 */
export const BehaviorEventSchema: GenMessage<BehaviorEvent> = /*@__PURE__*/
  messageDesc(file_spawner_packet_components_behavior_v1_behavior, 0);

/**
 * @generated from enum spawner.packet_components.behavior.v1.BehaviorEventRequestType
 */
export enum BehaviorEventRequestType {
  /**
   * @generated from enum value: BEHAVIOR_EVENT_REQUEST_TYPE_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * Indicates a step request. The agent will select an action based on its
   * current environment and domain. The agent must have an objective.
   *
   * @generated from enum value: BEHAVIOR_EVENT_REQUEST_TYPE_STEP = 1;
   */
  STEP = 1,
}

/**
 * Describes the enum spawner.packet_components.behavior.v1.BehaviorEventRequestType.
 */
export const BehaviorEventRequestTypeSchema: GenEnum<BehaviorEventRequestType> = /*@__PURE__*/
  enumDesc(file_spawner_packet_components_behavior_v1_behavior, 0);

