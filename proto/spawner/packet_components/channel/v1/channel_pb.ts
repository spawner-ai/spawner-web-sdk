// @generated by protoc-gen-es v2.2.2 with parameter "target=ts"
// @generated from file spawner/packet_components/channel/v1/channel.proto (package spawner.packet_components.channel.v1, syntax proto3)
/* eslint-disable */

import type { GenEnum, GenFile, GenMessage } from "@bufbuild/protobuf/codegenv1";
import { enumDesc, fileDesc, messageDesc } from "@bufbuild/protobuf/codegenv1";
import type { Actor } from "../../actor/v1/actor_pb";
import { file_spawner_packet_components_actor_v1_actor } from "../../actor/v1/actor_pb";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file spawner/packet_components/channel/v1/channel.proto.
 */
export const file_spawner_packet_components_channel_v1_channel: GenFile = /*@__PURE__*/
  fileDesc("CjJzcGF3bmVyL3BhY2tldF9jb21wb25lbnRzL2NoYW5uZWwvdjEvY2hhbm5lbC5wcm90bxIkc3Bhd25lci5wYWNrZXRfY29tcG9uZW50cy5jaGFubmVsLnYxIiEKC0NoYW5uZWxIb3N0EhIKCnNlc3Npb25faWQYASABKAkiIwoNQ2hhbm5lbE1lbWJlchISCgpzZXNzaW9uX2lkGAEgASgJIsECChFDaGFubmVsQ29udHJvbGxlchJJCgR0eXBlGAEgASgOMjsuc3Bhd25lci5wYWNrZXRfY29tcG9uZW50cy5jaGFubmVsLnYxLkNoYW5uZWxDb250cm9sbGVyVHlwZRISCgpjaGFubmVsX2lkGAIgASgJEj8KBGhvc3QYAyABKAsyMS5zcGF3bmVyLnBhY2tldF9jb21wb25lbnRzLmNoYW5uZWwudjEuQ2hhbm5lbEhvc3QSRAoHbWVtYmVycxgEIAMoCzIzLnNwYXduZXIucGFja2V0X2NvbXBvbmVudHMuY2hhbm5lbC52MS5DaGFubmVsTWVtYmVyEjgKBWFjdG9yGAUgASgLMikuc3Bhd25lci5wYWNrZXRfY29tcG9uZW50cy5hY3Rvci52MS5BY3RvchIMCgRzZWVkGAYgASgFKocBChVDaGFubmVsQ29udHJvbGxlclR5cGUSJwojQ0hBTk5FTF9DT05UUk9MTEVSX1RZUEVfVU5TUEVDSUZJRUQQABIiCh5DSEFOTkVMX0NPTlRST0xMRVJfVFlQRV9DUkVBVEUQARIhCh1DSEFOTkVMX0NPTlRST0xMRVJfVFlQRV9MRUFWRRACQucBCihjb20uc3Bhd25lci5wYWNrZXRfY29tcG9uZW50cy5jaGFubmVsLnYxQgxDaGFubmVsUHJvdG9QAaICA1NQQ6oCI1NwYXduZXIuUGFja2V0Q29tcG9uZW50cy5DaGFubmVsLlYxygIjU3Bhd25lclxQYWNrZXRDb21wb25lbnRzXENoYW5uZWxcVjHiAi9TcGF3bmVyXFBhY2tldENvbXBvbmVudHNcQ2hhbm5lbFxWMVxHUEJNZXRhZGF0YeoCJlNwYXduZXI6OlBhY2tldENvbXBvbmVudHM6OkNoYW5uZWw6OlYxYgZwcm90bzM", [file_spawner_packet_components_actor_v1_actor]);

/**
 * @generated from message spawner.packet_components.channel.v1.ChannelHost
 */
export type ChannelHost = Message<"spawner.packet_components.channel.v1.ChannelHost"> & {
  /**
   * @generated from field: string session_id = 1;
   */
  sessionId: string;
};

/**
 * Describes the message spawner.packet_components.channel.v1.ChannelHost.
 * Use `create(ChannelHostSchema)` to create a new message.
 */
export const ChannelHostSchema: GenMessage<ChannelHost> = /*@__PURE__*/
  messageDesc(file_spawner_packet_components_channel_v1_channel, 0);

/**
 * @generated from message spawner.packet_components.channel.v1.ChannelMember
 */
export type ChannelMember = Message<"spawner.packet_components.channel.v1.ChannelMember"> & {
  /**
   * @generated from field: string session_id = 1;
   */
  sessionId: string;
};

/**
 * Describes the message spawner.packet_components.channel.v1.ChannelMember.
 * Use `create(ChannelMemberSchema)` to create a new message.
 */
export const ChannelMemberSchema: GenMessage<ChannelMember> = /*@__PURE__*/
  messageDesc(file_spawner_packet_components_channel_v1_channel, 1);

/**
 * @generated from message spawner.packet_components.channel.v1.ChannelController
 */
export type ChannelController = Message<"spawner.packet_components.channel.v1.ChannelController"> & {
  /**
   * @generated from field: spawner.packet_components.channel.v1.ChannelControllerType type = 1;
   */
  type: ChannelControllerType;

  /**
   * Output only. Indicates the channel identifier.
   *
   * @generated from field: string channel_id = 2;
   */
  channelId: string;

  /**
   * The session hosting the channel. The host session will be
   * the primary processor of requests sent to the channel.
   *
   * The host MUST always have the 'smallest' session id. Clients
   * may want to sort members by ascending order and designate the
   * first entity to be the host.
   *
   * @generated from field: spawner.packet_components.channel.v1.ChannelHost host = 3;
   */
  host?: ChannelHost;

  /**
   * Indicates the member sessions of the channel. Should include
   * the channel host. Must be provided to create a channel.
   *
   * @generated from field: repeated spawner.packet_components.channel.v1.ChannelMember members = 4;
   */
  members: ChannelMember[];

  /**
   * Indicates the actors within a channel. Must be provided
   * to create a channel.
   *
   * @generated from field: spawner.packet_components.actor.v1.Actor actor = 5;
   */
  actor?: Actor;

  /**
   * Input only. Client may pass a seed to randomize the `channel_id` when all
   * other variables are unchanged.
   *
   * @generated from field: int32 seed = 6;
   */
  seed: number;
};

/**
 * Describes the message spawner.packet_components.channel.v1.ChannelController.
 * Use `create(ChannelControllerSchema)` to create a new message.
 */
export const ChannelControllerSchema: GenMessage<ChannelController> = /*@__PURE__*/
  messageDesc(file_spawner_packet_components_channel_v1_channel, 2);

/**
 * @generated from enum spawner.packet_components.channel.v1.ChannelControllerType
 */
export enum ChannelControllerType {
  /**
   * @generated from enum value: CHANNEL_CONTROLLER_TYPE_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * Indicates creating a channel.
   *
   * @generated from enum value: CHANNEL_CONTROLLER_TYPE_CREATE = 1;
   */
  CREATE = 1,

  /**
   * Indicates leaving a channel.
   *
   * @generated from enum value: CHANNEL_CONTROLLER_TYPE_LEAVE = 2;
   */
  LEAVE = 2,
}

/**
 * Describes the enum spawner.packet_components.channel.v1.ChannelControllerType.
 */
export const ChannelControllerTypeSchema: GenEnum<ChannelControllerType> = /*@__PURE__*/
  enumDesc(file_spawner_packet_components_channel_v1_channel, 0);

