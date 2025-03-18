// @generated by protoc-gen-es v2.2.2 with parameter "target=ts"
// @generated from file spawner/packet/v1/packet.proto (package spawner.packet.v1, syntax proto3)
/* eslint-disable */

import type { GenEnum, GenFile, GenMessage } from "@bufbuild/protobuf/codegenv1";
import { enumDesc, fileDesc, messageDesc } from "@bufbuild/protobuf/codegenv1";
import type { Timestamp } from "@bufbuild/protobuf/wkt";
import { file_google_protobuf_timestamp } from "@bufbuild/protobuf/wkt";
import type { AgentController } from "../../packet_components/agent/v1/agent_pb";
import { file_spawner_packet_components_agent_v1_agent } from "../../packet_components/agent/v1/agent_pb";
import type { BehaviorEvent } from "../../packet_components/behavior/v1/behavior_pb";
import { file_spawner_packet_components_behavior_v1_behavior } from "../../packet_components/behavior/v1/behavior_pb";
import type { ChannelController } from "../../packet_components/channel/v1/channel_pb";
import { file_spawner_packet_components_channel_v1_channel } from "../../packet_components/channel/v1/channel_pb";
import type { EmotionEvent } from "../../packet_components/emotion/v1/emotion_pb";
import { file_spawner_packet_components_emotion_v1_emotion } from "../../packet_components/emotion/v1/emotion_pb";
import type { InputFilterEvent } from "../../packet_components/input_filter/v1/input_filter_pb";
import { file_spawner_packet_components_input_filter_v1_input_filter } from "../../packet_components/input_filter/v1/input_filter_pb";
import type { KnowledgeEvent } from "../../packet_components/knowledge/v1/knowledge_pb";
import { file_spawner_packet_components_knowledge_v1_knowledge } from "../../packet_components/knowledge/v1/knowledge_pb";
import type { PerceptionEvent } from "../../packet_components/perception/v1/perception_pb";
import { file_spawner_packet_components_perception_v1_perception } from "../../packet_components/perception/v1/perception_pb";
import type { PromptInjectionEvent } from "../../packet_components/prompt_injection/v1/prompt_injection_pb";
import { file_spawner_packet_components_prompt_injection_v1_prompt_injection } from "../../packet_components/prompt_injection/v1/prompt_injection_pb";
import type { QuestEvent } from "../../packet_components/quest/v1/quest_pb";
import { file_spawner_packet_components_quest_v1_quest } from "../../packet_components/quest/v1/quest_pb";
import type { Routing } from "../../packet_components/routing/v1/routing_pb";
import { file_spawner_packet_components_routing_v1_routing } from "../../packet_components/routing/v1/routing_pb";
import type { SentimentEvent } from "../../packet_components/sentiment/v1/sentiment_pb";
import { file_spawner_packet_components_sentiment_v1_sentiment } from "../../packet_components/sentiment/v1/sentiment_pb";
import type { TextEvent } from "../../packet_components/text/v1/text_pb";
import { file_spawner_packet_components_text_v1_text } from "../../packet_components/text/v1/text_pb";
import type { WorldController } from "../../packet_components/world/v1/world_pb";
import { file_spawner_packet_components_world_v1_world } from "../../packet_components/world/v1/world_pb";
import type { ErrorEvent } from "../../utils/error/v1/error_pb";
import { file_spawner_utils_error_v1_error } from "../../utils/error/v1/error_pb";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file spawner/packet/v1/packet.proto.
 */
export const file_spawner_packet_v1_packet: GenFile = /*@__PURE__*/
  fileDesc("Ch5zcGF3bmVyL3BhY2tldC92MS9wYWNrZXQucHJvdG8SEXNwYXduZXIucGFja2V0LnYxIqoJCg1TcGF3bmVyUGFja2V0Ei0KCXRpbWVzdGFtcBgBIAEoCzIaLmdvb2dsZS5wcm90b2J1Zi5UaW1lc3RhbXASMgoEdHlwZRgCIAEoDjIkLnNwYXduZXIucGFja2V0LnYxLlNwYXduZXJQYWNrZXRUeXBlEj4KB3JvdXRpbmcYAyABKAsyLS5zcGF3bmVyLnBhY2tldF9jb21wb25lbnRzLnJvdXRpbmcudjEuUm91dGluZxIPCgdzdWNjZXNzGAQgASgIEjEKBWVycm9yGAUgASgLMiIuc3Bhd25lci51dGlscy5lcnJvci52MS5FcnJvckV2ZW50ElUKEmNoYW5uZWxfY29udHJvbGxlchgHIAEoCzI3LnNwYXduZXIucGFja2V0X2NvbXBvbmVudHMuY2hhbm5lbC52MS5DaGFubmVsQ29udHJvbGxlckgAEjwKBHRleHQYCCABKAsyLC5zcGF3bmVyLnBhY2tldF9jb21wb25lbnRzLnRleHQudjEuVGV4dEV2ZW50SAASUwoMaW5wdXRfZmlsdGVyGAkgASgLMjsuc3Bhd25lci5wYWNrZXRfY29tcG9uZW50cy5pbnB1dF9maWx0ZXIudjEuSW5wdXRGaWx0ZXJFdmVudEgAEkUKB2Vtb3Rpb24YCiABKAsyMi5zcGF3bmVyLnBhY2tldF9jb21wb25lbnRzLmVtb3Rpb24udjEuRW1vdGlvbkV2ZW50SAASSwoJa25vd2xlZGdlGAsgASgLMjYuc3Bhd25lci5wYWNrZXRfY29tcG9uZW50cy5rbm93bGVkZ2UudjEuS25vd2xlZGdlRXZlbnRIABJLCglzZW50aW1lbnQYDCABKAsyNi5zcGF3bmVyLnBhY2tldF9jb21wb25lbnRzLnNlbnRpbWVudC52MS5TZW50aW1lbnRFdmVudEgAEl8KEHByb21wdF9pbmplY3Rpb24YDSABKAsyQy5zcGF3bmVyLnBhY2tldF9jb21wb25lbnRzLnByb21wdF9pbmplY3Rpb24udjEuUHJvbXB0SW5qZWN0aW9uRXZlbnRIABJPChB3b3JsZF9jb250cm9sbGVyGA4gASgLMjMuc3Bhd25lci5wYWNrZXRfY29tcG9uZW50cy53b3JsZC52MS5Xb3JsZENvbnRyb2xsZXJIABJPChBhZ2VudF9jb250cm9sbGVyGA8gASgLMjMuc3Bhd25lci5wYWNrZXRfY29tcG9uZW50cy5hZ2VudC52MS5BZ2VudENvbnRyb2xsZXJIABJOCgpwZXJjZXB0aW9uGBAgASgLMjguc3Bhd25lci5wYWNrZXRfY29tcG9uZW50cy5wZXJjZXB0aW9uLnYxLlBlcmNlcHRpb25FdmVudEgAEkgKCGJlaGF2aW9yGBEgASgLMjQuc3Bhd25lci5wYWNrZXRfY29tcG9uZW50cy5iZWhhdmlvci52MS5CZWhhdmlvckV2ZW50SAASPwoFcXVlc3QYEiABKAsyLi5zcGF3bmVyLnBhY2tldF9jb21wb25lbnRzLnF1ZXN0LnYxLlF1ZXN0RXZlbnRIAEIJCgdwYXlsb2FkKvIDChFTcGF3bmVyUGFja2V0VHlwZRIjCh9TUEFXTkVSX1BBQ0tFVF9UWVBFX1VOU1BFQ0lGSUVEEAASKgomU1BBV05FUl9QQUNLRVRfVFlQRV9DSEFOTkVMX0NPTlRST0xMRVIQAhIcChhTUEFXTkVSX1BBQ0tFVF9UWVBFX1RFWFQQAxIkCiBTUEFXTkVSX1BBQ0tFVF9UWVBFX0lOUFVUX0ZJTFRFUhAEEh8KG1NQQVdORVJfUEFDS0VUX1RZUEVfRU1PVElPThAFEiEKHVNQQVdORVJfUEFDS0VUX1RZUEVfS05PV0xFREdFEAYSIQodU1BBV05FUl9QQUNLRVRfVFlQRV9TRU5USU1FTlQQBxIoCiRTUEFXTkVSX1BBQ0tFVF9UWVBFX1BST01QVF9JTkpFQ1RJT04QCBIoCiRTUEFXTkVSX1BBQ0tFVF9UWVBFX1dPUkxEX0NPTlRST0xMRVIQCRIoCiRTUEFXTkVSX1BBQ0tFVF9UWVBFX0FHRU5UX0NPTlRST0xMRVIQChIiCh5TUEFXTkVSX1BBQ0tFVF9UWVBFX1BFUkNFUFRJT04QCxIgChxTUEFXTkVSX1BBQ0tFVF9UWVBFX0JFSEFWSU9SEAwSHQoZU1BBV05FUl9QQUNLRVRfVFlQRV9RVUVTVBANQooBChVjb20uc3Bhd25lci5wYWNrZXQudjFCC1BhY2tldFByb3RvUAGiAgNTUFiqAhFTcGF3bmVyLlBhY2tldC5WMcoCEVNwYXduZXJcUGFja2V0XFYx4gIdU3Bhd25lclxQYWNrZXRcVjFcR1BCTWV0YWRhdGHqAhNTcGF3bmVyOjpQYWNrZXQ6OlYxYgZwcm90bzM", [file_google_protobuf_timestamp, file_spawner_packet_components_agent_v1_agent, file_spawner_packet_components_behavior_v1_behavior, file_spawner_packet_components_channel_v1_channel, file_spawner_packet_components_emotion_v1_emotion, file_spawner_packet_components_input_filter_v1_input_filter, file_spawner_packet_components_knowledge_v1_knowledge, file_spawner_packet_components_perception_v1_perception, file_spawner_packet_components_prompt_injection_v1_prompt_injection, file_spawner_packet_components_quest_v1_quest, file_spawner_packet_components_routing_v1_routing, file_spawner_packet_components_sentiment_v1_sentiment, file_spawner_packet_components_text_v1_text, file_spawner_packet_components_world_v1_world, file_spawner_utils_error_v1_error]);

/**
 * @generated from message spawner.packet.v1.SpawnerPacket
 */
export type SpawnerPacket = Message<"spawner.packet.v1.SpawnerPacket"> & {
  /**
   * Output only.
   *
   * @generated from field: google.protobuf.Timestamp timestamp = 1;
   */
  timestamp?: Timestamp;

  /**
   * @generated from field: spawner.packet.v1.SpawnerPacketType type = 2;
   */
  type: SpawnerPacketType;

  /**
   * Indicates routing of the event. For example, the source actor
   * and the target actor of the event.
   *
   * @generated from field: spawner.packet_components.routing.v1.Routing routing = 3;
   */
  routing?: Routing;

  /**
   * Output only. Sets to True if the requested operation has
   * been fulfilled.
   *
   * @generated from field: bool success = 4;
   */
  success: boolean;

  /**
   * Output only. The field is only populated on error.
   *
   * @generated from field: spawner.utils.error.v1.ErrorEvent error = 5;
   */
  error?: ErrorEvent;

  /**
   * removed: 6
   *
   * @generated from oneof spawner.packet.v1.SpawnerPacket.payload
   */
  payload: {
    /**
     * Controls channel creation and state.
     *
     * @generated from field: spawner.packet_components.channel.v1.ChannelController channel_controller = 7;
     */
    value: ChannelController;
    case: "channelController";
  } | {
    /**
     * Text generation input/output. Streams output text per token.
     *
     * @generated from field: spawner.packet_components.text.v1.TextEvent text = 8;
     */
    value: TextEvent;
    case: "text";
  } | {
    /**
     * Output only. Returns a value when the text input is flagged.
     *
     * @generated from field: spawner.packet_components.input_filter.v1.InputFilterEvent input_filter = 9;
     */
    value: InputFilterEvent;
    case: "inputFilter";
  } | {
    /**
     * Output only. Indicates the emotion values for the target character.
     *
     * @generated from field: spawner.packet_components.emotion.v1.EmotionEvent emotion = 10;
     */
    value: EmotionEvent;
    case: "emotion";
  } | {
    /**
     * Output only. Indicates the knowledge referenced during text generation.
     *
     * @generated from field: spawner.packet_components.knowledge.v1.KnowledgeEvent knowledge = 11;
     */
    value: KnowledgeEvent;
    case: "knowledge";
  } | {
    /**
     * Ouput only. Indicates the sentiment of the character.
     *
     * @generated from field: spawner.packet_components.sentiment.v1.SentimentEvent sentiment = 12;
     */
    value: SentimentEvent;
    case: "sentiment";
  } | {
    /**
     * Output only. Indicates the result of prompt injection detector.
     *
     * @generated from field: spawner.packet_components.prompt_injection.v1.PromptInjectionEvent prompt_injection = 13;
     */
    value: PromptInjectionEvent;
    case: "promptInjection";
  } | {
    /**
     * Controls world agents.
     *
     * @generated from field: spawner.packet_components.world.v1.WorldController world_controller = 14;
     */
    value: WorldController;
    case: "worldController";
  } | {
    /**
     * Agent event input/output.
     *
     * @generated from field: spawner.packet_components.agent.v1.AgentController agent_controller = 15;
     */
    value: AgentController;
    case: "agentController";
  } | {
    /**
     * Perception event handles information the agent receives from the
     * environment at runtime. This includes domains which define the
     * possible actions the agent may take.
     *
     * @generated from field: spawner.packet_components.perception.v1.PerceptionEvent perception = 16;
     */
    value: PerceptionEvent;
    case: "perception";
  } | {
    /**
     * Trigger and receive autonomous behavior from the agent.
     *
     * @generated from field: spawner.packet_components.behavior.v1.BehaviorEvent behavior = 17;
     */
    value: BehaviorEvent;
    case: "behavior";
  } | {
    /**
     * Only output. Quests are a "request for help" from the agent. Quests are generated when
     * there is an impediment to the agent's action.
     * TODO: This is not fully implemented yet.
     *
     * @generated from field: spawner.packet_components.quest.v1.QuestEvent quest = 18;
     */
    value: QuestEvent;
    case: "quest";
  } | { case: undefined; value?: undefined };
};

/**
 * Describes the message spawner.packet.v1.SpawnerPacket.
 * Use `create(SpawnerPacketSchema)` to create a new message.
 */
export const SpawnerPacketSchema: GenMessage<SpawnerPacket> = /*@__PURE__*/
  messageDesc(file_spawner_packet_v1_packet, 0);

/**
 * @generated from enum spawner.packet.v1.SpawnerPacketType
 */
export enum SpawnerPacketType {
  /**
   * @generated from enum value: SPAWNER_PACKET_TYPE_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * removed: 1
   *
   * @generated from enum value: SPAWNER_PACKET_TYPE_CHANNEL_CONTROLLER = 2;
   */
  CHANNEL_CONTROLLER = 2,

  /**
   * @generated from enum value: SPAWNER_PACKET_TYPE_TEXT = 3;
   */
  TEXT = 3,

  /**
   * @generated from enum value: SPAWNER_PACKET_TYPE_INPUT_FILTER = 4;
   */
  INPUT_FILTER = 4,

  /**
   * @generated from enum value: SPAWNER_PACKET_TYPE_EMOTION = 5;
   */
  EMOTION = 5,

  /**
   * @generated from enum value: SPAWNER_PACKET_TYPE_KNOWLEDGE = 6;
   */
  KNOWLEDGE = 6,

  /**
   * @generated from enum value: SPAWNER_PACKET_TYPE_SENTIMENT = 7;
   */
  SENTIMENT = 7,

  /**
   * @generated from enum value: SPAWNER_PACKET_TYPE_PROMPT_INJECTION = 8;
   */
  PROMPT_INJECTION = 8,

  /**
   * @generated from enum value: SPAWNER_PACKET_TYPE_WORLD_CONTROLLER = 9;
   */
  WORLD_CONTROLLER = 9,

  /**
   * @generated from enum value: SPAWNER_PACKET_TYPE_AGENT_CONTROLLER = 10;
   */
  AGENT_CONTROLLER = 10,

  /**
   * @generated from enum value: SPAWNER_PACKET_TYPE_PERCEPTION = 11;
   */
  PERCEPTION = 11,

  /**
   * @generated from enum value: SPAWNER_PACKET_TYPE_BEHAVIOR = 12;
   */
  BEHAVIOR = 12,

  /**
   * @generated from enum value: SPAWNER_PACKET_TYPE_QUEST = 13;
   */
  QUEST = 13,
}

/**
 * Describes the enum spawner.packet.v1.SpawnerPacketType.
 */
export const SpawnerPacketTypeSchema: GenEnum<SpawnerPacketType> = /*@__PURE__*/
  enumDesc(file_spawner_packet_v1_packet, 0);

