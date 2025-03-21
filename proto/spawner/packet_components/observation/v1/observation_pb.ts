// @generated by protoc-gen-es v2.2.2 with parameter "target=ts"
// @generated from file spawner/packet_components/observation/v1/observation.proto (package spawner.packet_components.observation.v1, syntax proto3)
/* eslint-disable */

import type { GenEnum, GenFile, GenMessage } from "@bufbuild/protobuf/codegenv1";
import { enumDesc, fileDesc, messageDesc } from "@bufbuild/protobuf/codegenv1";
import type { Interpretation } from "../../interpretation/v1/interpretation_pb";
import { file_spawner_packet_components_interpretation_v1_interpretation } from "../../interpretation/v1/interpretation_pb";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file spawner/packet_components/observation/v1/observation.proto.
 */
export const file_spawner_packet_components_observation_v1_observation: GenFile = /*@__PURE__*/
  fileDesc("CjpzcGF3bmVyL3BhY2tldF9jb21wb25lbnRzL29ic2VydmF0aW9uL3YxL29ic2VydmF0aW9uLnByb3RvEihzcGF3bmVyLnBhY2tldF9jb21wb25lbnRzLm9ic2VydmF0aW9uLnYxIroCChBPYnNlcnZhdGlvbkV2ZW50EkwKBHR5cGUYASABKA4yPi5zcGF3bmVyLnBhY2tldF9jb21wb25lbnRzLm9ic2VydmF0aW9uLnYxLk9ic2VydmF0aW9uRXZlbnRUeXBlEgwKBHRleHQYAiABKAkSEgoKaW1wb3J0YW5jZRgDIAEoBRJSCgppbnB1dF90eXBlGAQgASgOMj4uc3Bhd25lci5wYWNrZXRfY29tcG9uZW50cy5vYnNlcnZhdGlvbi52MS5PYnNlcnZhdGlvbklucHV0VHlwZRINCgVpbWFnZRgFIAEoDBJTCg5pbnRlcnByZXRhdGlvbhgGIAEoCzI7LnNwYXduZXIucGFja2V0X2NvbXBvbmVudHMuaW50ZXJwcmV0YXRpb24udjEuSW50ZXJwcmV0YXRpb24qXgoUT2JzZXJ2YXRpb25FdmVudFR5cGUSJgoiT0JTRVJWQVRJT05fRVZFTlRfVFlQRV9VTlNQRUNJRklFRBAAEh4KGk9CU0VSVkFUSU9OX0VWRU5UX1RZUEVfQUREEAEqgQEKFE9ic2VydmF0aW9uSW5wdXRUeXBlEiYKIk9CU0VSVkFUSU9OX0lOUFVUX1RZUEVfVU5TUEVDSUZJRUQQABIfChtPQlNFUlZBVElPTl9JTlBVVF9UWVBFX1RFWFQQARIgChxPQlNFUlZBVElPTl9JTlBVVF9UWVBFX0lNQUdFEAJC/wEKLGNvbS5zcGF3bmVyLnBhY2tldF9jb21wb25lbnRzLm9ic2VydmF0aW9uLnYxQhBPYnNlcnZhdGlvblByb3RvUAGiAgNTUE+qAidTcGF3bmVyLlBhY2tldENvbXBvbmVudHMuT2JzZXJ2YXRpb24uVjHKAidTcGF3bmVyXFBhY2tldENvbXBvbmVudHNcT2JzZXJ2YXRpb25cVjHiAjNTcGF3bmVyXFBhY2tldENvbXBvbmVudHNcT2JzZXJ2YXRpb25cVjFcR1BCTWV0YWRhdGHqAipTcGF3bmVyOjpQYWNrZXRDb21wb25lbnRzOjpPYnNlcnZhdGlvbjo6VjFiBnByb3RvMw", [file_spawner_packet_components_interpretation_v1_interpretation]);

/**
 * @generated from message spawner.packet_components.observation.v1.ObservationEvent
 */
export type ObservationEvent = Message<"spawner.packet_components.observation.v1.ObservationEvent"> & {
  /**
   * @generated from field: spawner.packet_components.observation.v1.ObservationEventType type = 1;
   */
  type: ObservationEventType;

  /**
   * Only input. Required field. The observation to add to the agent.
   *
   * @generated from field: string text = 2;
   */
  text: string;

  /**
   * Only input. Indicates the importance of the observation, represented as an
   * integer between 1 (low importance) and 9 (high importance). If a value is
   * not provided, value will be automatically detected.
   *
   * @generated from field: int32 importance = 3;
   */
  importance: number;

  /**
   * @generated from field: spawner.packet_components.observation.v1.ObservationInputType input_type = 4;
   */
  inputType: ObservationInputType;

  /**
   * Only input. Accepts an image as binary data.
   *
   * @generated from field: bytes image = 5;
   */
  image: Uint8Array;

  /**
   * Indicates how the agent interprets the observations. Observations may be
   * interpretted differently depending on the agent. If empty, interpretations
   * will not be made, and observation will be used directly.
   *
   * @generated from field: spawner.packet_components.interpretation.v1.Interpretation interpretation = 6;
   */
  interpretation?: Interpretation;
};

/**
 * Describes the message spawner.packet_components.observation.v1.ObservationEvent.
 * Use `create(ObservationEventSchema)` to create a new message.
 */
export const ObservationEventSchema: GenMessage<ObservationEvent> = /*@__PURE__*/
  messageDesc(file_spawner_packet_components_observation_v1_observation, 0);

/**
 * @generated from enum spawner.packet_components.observation.v1.ObservationEventType
 */
export enum ObservationEventType {
  /**
   * @generated from enum value: OBSERVATION_EVENT_TYPE_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * Add a new observation for the agent.
   *
   * @generated from enum value: OBSERVATION_EVENT_TYPE_ADD = 1;
   */
  ADD = 1,
}

/**
 * Describes the enum spawner.packet_components.observation.v1.ObservationEventType.
 */
export const ObservationEventTypeSchema: GenEnum<ObservationEventType> = /*@__PURE__*/
  enumDesc(file_spawner_packet_components_observation_v1_observation, 0);

/**
 * @generated from enum spawner.packet_components.observation.v1.ObservationInputType
 */
export enum ObservationInputType {
  /**
   * @generated from enum value: OBSERVATION_INPUT_TYPE_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * The observation is a text string.
   *
   * @generated from enum value: OBSERVATION_INPUT_TYPE_TEXT = 1;
   */
  TEXT = 1,

  /**
   * The observation is an image.
   *
   * @generated from enum value: OBSERVATION_INPUT_TYPE_IMAGE = 2;
   */
  IMAGE = 2,
}

/**
 * Describes the enum spawner.packet_components.observation.v1.ObservationInputType.
 */
export const ObservationInputTypeSchema: GenEnum<ObservationInputType> = /*@__PURE__*/
  enumDesc(file_spawner_packet_components_observation_v1_observation, 1);

