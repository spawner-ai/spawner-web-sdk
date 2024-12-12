// @generated by protoc-gen-es v2.2.2 with parameter "target=ts"
// @generated from file spawner/world/v1/world.proto (package spawner.world.v1, syntax proto3)
/* eslint-disable */

import type { GenEnum, GenFile, GenMessage } from "@bufbuild/protobuf/codegenv1";
import { enumDesc, fileDesc, messageDesc } from "@bufbuild/protobuf/codegenv1";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file spawner/world/v1/world.proto.
 */
export const file_spawner_world_v1_world: GenFile = /*@__PURE__*/
  fileDesc("ChxzcGF3bmVyL3dvcmxkL3YxL3dvcmxkLnByb3RvEhBzcGF3bmVyLndvcmxkLnYxIkgKDkFnZW50Q2hhcmFjdGVyEgwKBG5hbWUYASABKAkSFQoJY3VzdG9tX2lkGAIgASgJQgIYARIRCgljbGllbnRfaWQYAyABKAkilAEKEkFnZW50Q29uZmlndXJhdGlvbhIKCgJpZBgBIAEoCRIUCgxibHVlcHJpbnRfaWQYAiABKAkSFAoMZGlzcGxheV9uYW1lGAMgASgJEjMKCWNoYXJhY3RlchgEIAEoCzIgLnNwYXduZXIud29ybGQudjEuQWdlbnRDaGFyYWN0ZXISEQoJb2JqZWN0aXZlGAUgASgJIloKEENyZWF0ZVdvcmxkRXZlbnQSEAoId29ybGRfaWQYASABKAkSNAoGYWdlbnRzGAIgAygLMiQuc3Bhd25lci53b3JsZC52MS5BZ2VudENvbmZpZ3VyYXRpb24iWAoOTG9hZFdvcmxkRXZlbnQSEAoId29ybGRfaWQYASABKAkSNAoGYWdlbnRzGAIgAygLMiQuc3Bhd25lci53b3JsZC52MS5BZ2VudENvbmZpZ3VyYXRpb24iuQEKD1dvcmxkQ29udHJvbGxlchIzCgR0eXBlGAEgASgOMiUuc3Bhd25lci53b3JsZC52MS5Xb3JsZENvbnRyb2xsZXJUeXBlEjQKBmNyZWF0ZRgCIAEoCzIiLnNwYXduZXIud29ybGQudjEuQ3JlYXRlV29ybGRFdmVudEgAEjAKBGxvYWQYAyABKAsyIC5zcGF3bmVyLndvcmxkLnYxLkxvYWRXb3JsZEV2ZW50SABCCQoHcGF5bG9hZCp+ChNXb3JsZENvbnRyb2xsZXJUeXBlEiUKIVdPUkxEX0NPTlRST0xMRVJfVFlQRV9VTlNQRUNJRklFRBAAEiAKHFdPUkxEX0NPTlRST0xMRVJfVFlQRV9DUkVBVEUQARIeChpXT1JMRF9DT05UUk9MTEVSX1RZUEVfTE9BRBACQoQBChRjb20uc3Bhd25lci53b3JsZC52MUIKV29ybGRQcm90b1ABogIDU1dYqgIQU3Bhd25lci5Xb3JsZC5WMcoCEFNwYXduZXJcV29ybGRcVjHiAhxTcGF3bmVyXFdvcmxkXFYxXEdQQk1ldGFkYXRh6gISU3Bhd25lcjo6V29ybGQ6OlYxYgZwcm90bzM");

/**
 * @generated from message spawner.world.v1.AgentCharacter
 */
export type AgentCharacter = Message<"spawner.world.v1.AgentCharacter"> & {
  /**
   * Only output. Relative resource path.
   * Format: `workspaces:{workspace_id}:characters:{character_id}`
   *
   * @generated from field: string name = 1;
   */
  name: string;

  /**
   * @generated from field: string custom_id = 2 [deprecated = true];
   * @deprecated
   */
  customId: string;

  /**
   * Custom identifier used in the client. This may be set in the console. This
   * replaces `custom_id`.
   *
   * @generated from field: string client_id = 3;
   */
  clientId: string;
};

/**
 * Describes the message spawner.world.v1.AgentCharacter.
 * Use `create(AgentCharacterSchema)` to create a new message.
 */
export const AgentCharacterSchema: GenMessage<AgentCharacter> = /*@__PURE__*/
  messageDesc(file_spawner_world_v1_world, 0);

/**
 * @generated from message spawner.world.v1.AgentConfiguration
 */
export type AgentConfiguration = Message<"spawner.world.v1.AgentConfiguration"> & {
  /**
   * Only ouput.
   *
   * @generated from field: string id = 1;
   */
  id: string;

  /**
   * Indicates the agent blueprint used by this agent. May be left empty if the
   * agent is not autonomous.
   *
   * @generated from field: string blueprint_id = 2;
   */
  blueprintId: string;

  /**
   * Only input. If `display_name` is defined, it overwrites the `display_name`
   * defined in the character.
   *
   * For example, a character that is shared among multiple agents may have a
   * generic name, this field may set a unique name for each agent. This way,
   * you may reuse character settings while making them appear to be different
   * characters.
   *
   * @generated from field: string display_name = 3;
   */
  displayName: string;

  /**
   * @generated from field: spawner.world.v1.AgentCharacter character = 4;
   */
  character?: AgentCharacter;

  /**
   * Describes the current objective of the agent. If an objective is passed
   * when creating an event, the agent's objective will be initialized with the
   * value passed.
   *
   * @generated from field: string objective = 5;
   */
  objective: string;
};

/**
 * Describes the message spawner.world.v1.AgentConfiguration.
 * Use `create(AgentConfigurationSchema)` to create a new message.
 */
export const AgentConfigurationSchema: GenMessage<AgentConfiguration> = /*@__PURE__*/
  messageDesc(file_spawner_world_v1_world, 1);

/**
 * @generated from message spawner.world.v1.CreateWorldEvent
 */
export type CreateWorldEvent = Message<"spawner.world.v1.CreateWorldEvent"> & {
  /**
   * Only output. The id of the world that has been created.
   *
   * @generated from field: string world_id = 1;
   */
  worldId: string;

  /**
   * @generated from field: repeated spawner.world.v1.AgentConfiguration agents = 2;
   */
  agents: AgentConfiguration[];
};

/**
 * Describes the message spawner.world.v1.CreateWorldEvent.
 * Use `create(CreateWorldEventSchema)` to create a new message.
 */
export const CreateWorldEventSchema: GenMessage<CreateWorldEvent> = /*@__PURE__*/
  messageDesc(file_spawner_world_v1_world, 2);

/**
 * @generated from message spawner.world.v1.LoadWorldEvent
 */
export type LoadWorldEvent = Message<"spawner.world.v1.LoadWorldEvent"> & {
  /**
   * @generated from field: string world_id = 1;
   */
  worldId: string;

  /**
   * Only output. Indicates the current state of agents.
   *
   * @generated from field: repeated spawner.world.v1.AgentConfiguration agents = 2;
   */
  agents: AgentConfiguration[];
};

/**
 * Describes the message spawner.world.v1.LoadWorldEvent.
 * Use `create(LoadWorldEventSchema)` to create a new message.
 */
export const LoadWorldEventSchema: GenMessage<LoadWorldEvent> = /*@__PURE__*/
  messageDesc(file_spawner_world_v1_world, 3);

/**
 * Message for Spawner Worlds. A world is a high-level entity with the primary
 * role of mananging autonomous/non-autonomous agents. Agents must have a
 * character attached.
 *
 * @generated from message spawner.world.v1.WorldController
 */
export type WorldController = Message<"spawner.world.v1.WorldController"> & {
  /**
   * @generated from field: spawner.world.v1.WorldControllerType type = 1;
   */
  type: WorldControllerType;

  /**
   * @generated from oneof spawner.world.v1.WorldController.payload
   */
  payload: {
    /**
     * @generated from field: spawner.world.v1.CreateWorldEvent create = 2;
     */
    value: CreateWorldEvent;
    case: "create";
  } | {
    /**
     * @generated from field: spawner.world.v1.LoadWorldEvent load = 3;
     */
    value: LoadWorldEvent;
    case: "load";
  } | { case: undefined; value?: undefined };
};

/**
 * Describes the message spawner.world.v1.WorldController.
 * Use `create(WorldControllerSchema)` to create a new message.
 */
export const WorldControllerSchema: GenMessage<WorldController> = /*@__PURE__*/
  messageDesc(file_spawner_world_v1_world, 4);

/**
 * @generated from enum spawner.world.v1.WorldControllerType
 */
export enum WorldControllerType {
  /**
   * @generated from enum value: WORLD_CONTROLLER_TYPE_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * Creates a new world.
   *
   * @generated from enum value: WORLD_CONTROLLER_TYPE_CREATE = 1;
   */
  CREATE = 1,

  /**
   * Loads an existing world.
   *
   * @generated from enum value: WORLD_CONTROLLER_TYPE_LOAD = 2;
   */
  LOAD = 2,
}

/**
 * Describes the enum spawner.world.v1.WorldControllerType.
 */
export const WorldControllerTypeSchema: GenEnum<WorldControllerType> = /*@__PURE__*/
  enumDesc(file_spawner_world_v1_world, 0);

