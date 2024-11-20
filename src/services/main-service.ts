import { type CallOptions, type Client, createClient } from "@connectrpc/connect";
import { createGrpcWebTransport } from "@connectrpc/connect-web";
import { type WritableIterable, createWritableIterable } from "@connectrpc/connect/protocol";
import { create } from "@bufbuild/protobuf";

import { GenerateSessionTokenRequestSchema, MainService } from "../../proto/spawner/main/v1/main_pb";
import { MainServiceType } from "../common/types";
import { type FeatureConfiguration } from "../../proto/spawner/main/v1/main_pb";
import { SpawnerPacketSchema, SpawnerPacket as ProtoPacket, SpawnerPacketType, SpawnerPacketTypeSchema } from "../../proto/spawner/packet/v1/packet_pb";
import type { ConnectionConfig } from "../common/types";
import { ActorSchema, AgentActorSchema, PlayerActorSchema } from "../../proto/spawner/actor/v1/actor_pb";
import {
	ChannelController,
	ChannelControllerSchema,
	ChannelControllerType,
	ChannelHostSchema,
	ChannelMemberSchema,
} from "../../proto/spawner/channel/v1/channel_pb";
import { LanguageCode } from "../../proto/spawner/language_code/v1/language_code_pb";
import { CreateWorldEventSchema, WorldControllerSchema, WorldControllerType, WorldController, CreateWorldEvent, AgentConfigurationSchema, AgentCharacterSchema, LoadWorldEventSchema, LoadWorldEvent } from "../../proto/spawner/world/v1/world_pb";

import type { ConnectionError } from "../common/types";
import type { Character } from "../entities/character.entity";
import { PacketError } from "../entities/packets/error.entity";
import { SpawnerPacket } from "../entities/packets/spawner_packet.entity";
import type { Player } from "../entities/player.entity";
import { SessionToken } from "../entities/session_token.entity";
import { World } from "../entities/world.entity";
import { Channel } from "../entities/channel.entity";

interface OpenSessionProps {
	sessionToken: SessionToken;
	onError: ((err: ConnectionError) => void) | undefined;
	onMessage: ((packet: SpawnerPacket) => void) | undefined;
	onClose: (() => void) | undefined;
}

interface ServiceProps {
	config: ConnectionConfig;
}

interface GenerateSessionTokenProps {
	apiKey: string;
	apiSecret: string;
	workspaceId: string;
	playerId: string;
	featureConfiguration: FeatureConfiguration;
  worldId?: string;
}

interface CreateWorldProps {
  sessionToken: SessionToken;
  characters: Character[];
}

interface LoadWorldProps {
  sessionToken: SessionToken;
  worldId: string;
}

export class SpawnerMainService {
	private config: ConnectionConfig;
	private client: Client<MainServiceType>;

	constructor(props: ServiceProps) {
		this.config = props.config;

		this.client = this.createClient();
	}

	private createClient() {
		const { hostname, ssl } = this.config.gateway!;
		const client = createClient(
			MainService,
			createGrpcWebTransport({
				baseUrl: `${ssl ? `https` : `http`}://${hostname}`,
			}),
		);
		return client;
	}

	async openSession(props: OpenSessionProps): Promise<WritableIterable<ProtoPacket>> {
		const { sessionToken, onMessage, onError, onClose } = props;

		const connection = createWritableIterable<ProtoPacket>();
		const options = this.getOptions(sessionToken);
		const responses = this.client.connectSession(connection, options);

		const processResponses = async () => {
			try {
				for await (const res of responses) {
					if (res.success) {
						onMessage?.(SpawnerPacket.convertProto(res));
					} else {
						// caught spawner packet error
						const err = PacketError.convertProto(res.error!);
						onError?.(err);
					}
				}
			} catch (err: unknown) {
				// caught grpc error
				onError?.(err);
			}
		};

		processResponses();

		return Promise.resolve(connection);
	}

	async openChannel(sessionToken: SessionToken, players: Player[], characters: Character[]): Promise<Channel> {

    const host = create(ChannelHostSchema, {
      sessionId: sessionToken.sessionId,
    });

    const members = [create(ChannelMemberSchema, {
      sessionId: sessionToken.sessionId,
    })]

    const actor = create(ActorSchema, {
			players: players.map(p => 
        create(PlayerActorSchema, {
          id: p.id, displayName: p.display_name
        })
    ),
			agents: characters.map(c => 
        create(AgentActorSchema, {
          id: c.agent?.id
        })
      )
		})

    const channelController = create(ChannelControllerSchema, {
      type: ChannelControllerType.CREATE,
			host,
			members,
			actor,
    })

    const packet = create(SpawnerPacketSchema, {
      type: SpawnerPacketType.CHANNEL_CONTROLLER,
			payload: {
				case: "channelController",
				value: channelController,
			},
    })

		const options = this.getOptions(sessionToken);

		const channelPacket = await this.client.openChannel(packet, options);

		const protoChannel = channelPacket.payload.value as ChannelController;

    const channel = Channel.convertProto(protoChannel);
		return channel;
	}

	async generateSessionToken(props: GenerateSessionTokenProps) {
    const generateSessionTokenRequest = create(GenerateSessionTokenRequestSchema, {
      apiKey: props.apiKey,
			apiSecret: props.apiSecret,
			workspaceId: props.workspaceId,
			playerId: props.playerId,
			featureConfiguration: props.featureConfiguration,
			languageCode: LanguageCode.JA
    });

		const protoSessionToken = await this.client.generateSessionToken(generateSessionTokenRequest);

    const sessionToken = SessionToken.convertProto(protoSessionToken);

		return sessionToken;
	}

  async createWorld(props: CreateWorldProps){
    const { sessionToken, characters} = props
    if (!sessionToken.token) {
			throw Error("Session token is not valid. Generate a session token before creating world.");
		}

    const agents = characters.map(c => (
      create(AgentConfigurationSchema, {
        id: c.agent?.id,
        blueprintId: c.agent?.blueprintId,
        displayName: c.agent?.displayName,
        character: create(AgentCharacterSchema, {
          customId: c.customId
        }),
        objective: c.agent?.objective
      })
    )
    )
    console.log(agents)

    const protoWorld = create(CreateWorldEventSchema, {
      agents
    })

    const worldController = create(WorldControllerSchema, {
      type: WorldControllerType.CREATE,
      payload: {
        value: protoWorld,
        case: "create"
      }
    })

    const packet = create(SpawnerPacketSchema, {
      type: SpawnerPacketType.WORLD_CONTROLLER,
      payload: {
        case: "worldController",
        value: worldController
      }
    })

    const options = this.getOptions(sessionToken);
    const worldPacket = await this.client.createWorld(packet, options);
    const packetWorldController = worldPacket.payload.value as WorldController
    const createdWorld = packetWorldController.payload.value as CreateWorldEvent

    const world = World.convertProto(createdWorld)
    return world
  }

  async LoadWorld(props: LoadWorldProps) {
    const { worldId, sessionToken } = props;

    const loadWorldEvent = create(LoadWorldEventSchema, {
      worldId
    })

    const worldController = create(WorldControllerSchema, {
      type: WorldControllerType.LOAD,
      payload: {
        value: loadWorldEvent,
        case: "load"
      }
    })

    const loadWorldRequest = create(SpawnerPacketSchema, {
      type: SpawnerPacketType.WORLD_CONTROLLER,
      payload: {
        case: "worldController",
        value: worldController
      }
    })

    const options = this.getOptions(sessionToken);
    const worldPacket = await this.client.loadWorld(loadWorldRequest, options)

    const packetWorldController = worldPacket.payload.value as WorldController
    const loadWorld = packetWorldController.payload.value as LoadWorldEvent
    const world = World.convertProto(loadWorld)
    return world
  }

  private getOptions(sessionToken: SessionToken) {
		const { token } = sessionToken;
		const headers = new Headers();
		headers.set("authorization", token);
		const options: CallOptions = {
			headers,
		};
		return options;
	}
}
