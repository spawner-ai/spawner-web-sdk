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
  apiKey?: ApiKey;
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
    try {
      const sessionToken = await this.ensureSessionToken(session);

      if (prevSessionToken !== this.sessionToken) {
        this.connectionProps.sessionAccessor?.set(sessionToken);
      }
  
      if(!world){
        if(!this.connectionProps.characters){
          throw Error("The character to be given to the world is empty or undefined.")
        }
        const createdWorld = await this.mainService.createWorld({
          sessionToken: sessionToken,
          characters: this.connectionProps.characters
        })
        this.world = createdWorld;
      } else {
        const loadWorld = await this.mainService.LoadWorld({
          sessionToken: sessionToken,
          worldId: world.id
        });
        this.world = loadWorld;
      }
  
      await this.connection.open({
        session: sessionToken
      });
  
      this.state = ConnectionState.ACTIVE
      return this.world;
    } catch(err) {
      this.onError(err);
      return;
    }
	}

  async openChannel(characters: Character[]) {
    try{
      if(!this.isActive()){
        throw Error("Connection is inactive. Connection is must be active to start interaction.")
      }
      const sessionToken = await this.ensureSessionToken(this.sessionToken);
      const channel = await this.mainService.openChannel(
        sessionToken,
        this.players,
        characters
      );
      this.channel = channel;
      return channel
    } catch (err) {
      throw err
    }    
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

  async getCharacters() {
    const world = await this.open(this.world)
    return world ? world.characters : [];
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

		this.connection.write(sendPacket);
	}

	async generateSessionToken() {
		const { feature } = this.connectionProps.config
    const featureConfiguration = create(FeatureConfigurationSchema, feature)
    
    if (!this.connectionProps.apiKey) {
      throw Error("Api key is not set. Use setApiKey() to set the api key and secret to generate a session token from the client");
    }
    
    const { key, secret } = this.connectionProps.apiKey;
    
    if (!key || !secret) {
      const missing = !key ? "Api key" : "Api Secret";
      throw Error(`${missing} is not set. Use setApiKey() to set the ${missing.toLowerCase()} to generate a session token from the client`);
    }
    
    try{
      const sessionToken = await this.mainService.generateSessionToken({
        apiKey: key,
        apiSecret: secret,
        workspaceId: this.connectionProps.workspaceId,
        playerId: this.players[0].id,
        featureConfiguration,
      });
      
      this.sessionToken = sessionToken;
      return sessionToken;
    } catch(err) {
      throw err;
    }    
	}

  async refreshSessionToken(refreshToken: string) {
    const sessionToken = await this.mainService.refreshSessionToken({
      refreshToken
    });

    this.sessionToken = sessionToken;
    return sessionToken
  }

	private async ensureSessionToken(session?: SessionToken) {
		let sessionToken = session ?? this.sessionToken;

		if (!sessionToken || SessionToken.isExpired(sessionToken)) {
      if(!this.connectionProps.generateSessionToken){
        try {
          sessionToken = await this.generateSessionToken()
        } catch (err) {
          throw err
        }
      } else {
        sessionToken = await this.connectionProps.generateSessionToken();
      }
		}
    this.sessionToken = sessionToken;
    return this.sessionToken;
	}

	private ensurePlayer(player?: Player) {
		if (player) {
			this.players = Array.of(player);
		} else {
			const defaultPlayer = new Player({
				id: "player",
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
