import { v4 } from 'uuid'
import { create } from "@bufbuild/protobuf";
import { FeatureConfigurationSchema } from "../../proto/spawner/main/v1/main_pb";
import {
	SpawnerPacketSchema,
	SpawnerPacketType,
  SpawnerPacket as ProtoPacket
} from "../../proto/spawner/packet/v1/packet_pb";
import { EventActorSchema, EventActorType, EventAgentSchema, EventPlayerSchema, RoutingSchema } from "../../proto/spawner/routing/v1/routing_pb";
import type {
	ApiKey,
	InternalConnectionConfig,
	Accessor,
	ConnectionError,
  GenerateSessionTokenFn
} from "../common/types";
import { ConnectionState, Awaitable } from "../common/types";
import { Channel } from "../entities/channel.entity";
import { Character } from "../entities/character.entity";
import type { SpawnerPacket } from "../entities/packets/spawner_packet.entity";
import { Player } from "../entities/player.entity";
import { SessionToken } from "../entities/session_token.entity";
import { SpawnerMainService } from "./main-service";
import { TextEventSchema } from "../../proto/spawner/text/v1/text_pb";
import { World } from "../entities/world.entity";
import { type WebSocketProps, Connection } from '../connection/websocket-connection';

interface ConnectionProps {
	config: InternalConnectionConfig;
	apiKey: ApiKey;
	workspaceId: string;
	player?: Player;
  characters?: Character[];
	sessionAccessor?: Accessor<SessionToken>;
	onOpen: () => void;
	onError: (err: ConnectionError) => void;
	onMessage: (packet: SpawnerPacket) => void;
	onClose: () => void;
  generateSessionToken?: GenerateSessionTokenFn
}

export class ConnectionService {
	private connectionProps: ConnectionProps;
	private connection: Connection;
	private state: ConnectionState = ConnectionState.INACTIVE;
	private sessionToken!: SessionToken | undefined;
	private channel: Channel | undefined;
	private players: Player[];
  private world: World | undefined;

	private onOpen: (() => Awaitable<void>);
	private onError: ((err: ConnectionError) => Awaitable<void>);
	private onMessage: ((packet: SpawnerPacket) => Awaitable<void>);
	private onClose: (() => Awaitable<void>);

	private mainService: SpawnerMainService;

	constructor(props: ConnectionProps) {
		this.connectionProps = props;
		const { config, player, onOpen, onError, onMessage, onClose } = props;

		this.onOpen = () => {
			this.state = ConnectionState.ACTIVE;
			onOpen?.();
		};

		this.onError = onError;

		this.onMessage = (packet: SpawnerPacket) => {
				onMessage?.(packet);
		};

		this.onClose = () => {
			this.state = ConnectionState.INACTIVE;

			onClose?.();
		};

		this.players = this.ensurePlayer(player);

		this.mainService = new SpawnerMainService({
			config,
      onError: this.onError
		});

    const websocketProps: WebSocketProps = {
      onOpen: this.onOpen,
      onMessage: this.onMessage,
      onError: this.onError,
      onClose: this.onClose,
    };

    this.connection = new Connection(websocketProps);
	}

	async open(world?: World): Promise<World | void> {
		if (this.state !== ConnectionState.INACTIVE) return;

    this.state = ConnectionState.ACTIVATING;
		let session: SessionToken | undefined;
		if (this.connectionProps.sessionAccessor) {
			session = await this.connectionProps.sessionAccessor.get();
		}

		const prevSessionToken = this.sessionToken;
		await this.ensureSessionToken(session);

    if(!this.sessionToken) {
      throw Error("Something went wrong and the session token could not be passed or generated.")
    }

		if (prevSessionToken !== this.sessionToken) {
			this.connectionProps.sessionAccessor?.set(this.sessionToken);
		}

    if(!world){
      if(!this.connectionProps.characters){
        throw Error("The character to be given to the world is empty or undefined.")
      }
      const createdWorld = await this.mainService.createWorld({
        sessionToken: this.sessionToken,
        characters: this.connectionProps.characters
      })
      this.world = createdWorld;
    } else {
      const loadWorld = await this.mainService.LoadWorld({
        sessionToken: this.sessionToken,
        worldId: world.id
      });
      this.world = loadWorld;
    }

    await this.connection.open({
      session: this.sessionToken
    });

    this.state = ConnectionState.ACTIVE
    return this.world;
	}

  async openChannel(characters: Character[]) {
    if(!this.isActive()){
      throw Error("Connection is inactive. Connection is must be active to start interaction.")
    }
    const sessionToken = await this.ensureSessionToken(this.sessionToken);
    const channel = await this.mainService.openChannel(
      sessionToken,
      this.players,
      characters
    );
    
    return channel
  }

	close() {
		this.state = ConnectionState.INACTIVE;
    this.connection.close()
	}

	isActive() {
		return this.state === ConnectionState.ACTIVE;
	}

	getConnectionState() {
		return this.state;
	}

  getCharacters() {
    if(!this.world){
      throw Error("World is not exist. Open connection to create or assign the world to the session.")
    }
    return this.world?.characters;
  }

	async sendText(text: string) {
		this.validate();

		const textEvent = create(TextEventSchema, {
			utteranceId: v4(),
			text,
		});

    const eventPlayer = create(EventPlayerSchema, {
      id: this.players[0].id,
    })

    const eventAgent = create(EventAgentSchema, {
      id: this.world?.characters[0].agent?.id,
    })

    const source = create(EventActorSchema, {
      type: EventActorType.PLAYER,
      payload: {
        case: "player",
        value: eventPlayer
      }
    })

    const target = create(EventActorSchema, {
      type: EventActorType.AGENT,
      payload: {
        case: "agent",
        value: eventAgent
      }
    })

    const routing = create(RoutingSchema, {
      source,
      target
    })

		const sendPacket: ProtoPacket = create(SpawnerPacketSchema, {
      type: SpawnerPacketType.TEXT,
			routing,
			payload: {
				case: "text",
				value: textEvent,
			}
    })

    //const sessionToken = await this.ensureSessionToken(this.sessionToken)

		this.connection.write(sendPacket);
	}

	async generateSessionToken() {
		const { feature } = this.connectionProps.config
    const featureConfiguration = create(FeatureConfigurationSchema, feature)
    
    const sessionToken = await this.mainService.generateSessionToken({
			apiKey: this.connectionProps.apiKey.key,
			apiSecret: this.connectionProps.apiKey.secret,
			workspaceId: this.connectionProps.workspaceId,
			playerId: this.players[0].id,
			featureConfiguration
		});

		this.sessionToken = sessionToken;
		return sessionToken;
	}

  async refreshSessionToken(refreshToken: string) {
    const sessionToken = await this.mainService.refreshSessionToken({
      refreshToken,
      onError: this.onError
    });

    this.sessionToken = sessionToken;
    return sessionToken
  }

	private async ensureSessionToken(session?: SessionToken) {
		let sessionToken = session ?? this.sessionToken;

		if (!sessionToken || SessionToken.isExpired(sessionToken)) {
      sessionToken = await this.generateSessionToken();
		}

		this.sessionToken = sessionToken;

		return this.sessionToken;
	}

	private ensurePlayer(player?: Player) {
		if (player) {
			this.players = Array.of(player);
		} else {
			const defaultPlayer = new Player({
				id: "player-1",
				display_name: "Player",
			});
			this.players = Array.of(defaultPlayer);
		}
		return this.players;
	}

	private validate() {
		if (!this.isActive()) {
			throw Error("Connection is not ready.");
		}

		if (!this.sessionToken) {
			throw Error("Session token is undefined.");
		}
	}
}
