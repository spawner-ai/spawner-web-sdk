import { GRPC_HOSTNAME, DEFAULT_DISCONNECT_TIMEOUT } from "../common/config";
import type { ApiKey, ConnectionConfig, AutoConnectConfig, Gateway, Accessor } from "../common/types";
import type { ConnectionError } from "../common/types";
import type { SpawnerPacket } from "../entities/packets/spawner_packet.entity";
import type { Player } from "../entities/player.entity";
import { ConnectionService } from "../services/connection-service";
import type { SessionToken } from "../entities/session_token.entity";
import type { FeatureConfiguration } from "../common/types";
import { Character } from "../entities/character.entity";

export class SpawnerClient {
	private config: ConnectionConfig = {};
	private apiKey: ApiKey | undefined;
	private workspaceId: string | undefined;
	private player: Player | undefined;
  private characters: Character[] | undefined;
  private sessionAccessor: Accessor<SessionToken> | undefined;
	private onOpen: (() => void) | undefined;
	private onError: ((err: ConnectionError) => void) | undefined;
	private onMessage: ((packet: SpawnerPacket) => void) | undefined;
	private onClose: ((event?: CloseEvent) => void) | undefined;

	public setup() {
		this.validate();
		const config = this.ensureConfig();

		return new ConnectionService({
			config,
			apiKey: this.apiKey!,
			workspaceId: this.workspaceId!,
      sessionAccessor: this.sessionAccessor,
			player: this.player,
      characters: this.characters,
			onOpen: this.onOpen,
			onError: this.onError,
			onMessage: this.onMessage,
			onClose: this.onClose,
		});
	}

	async generateSessionToken() {
		this.validate();

		const config = this.ensureConfig();

		const service = new ConnectionService({
			config,
			apiKey: this.apiKey!,
			workspaceId: this.workspaceId!,
		});

		const token = await service.generateSessionToken();
		return token;
	}

	private ensureConfig() {
		const gateway: Gateway = this.ensureGateway(this.config?.gateway);
    const feature: FeatureConfiguration = this.ensureFeature(this.config?.feature);
    const autoConnect: AutoConnectConfig = this.ensureAutoConnectConfig(this.config?.autoConnect)
		const config: ConnectionConfig = { gateway, autoConnect,feature };
		return config;
	}

	setApiKey(apiKey: ApiKey) {
		this.apiKey = apiKey;

		return this;
	}

	setWorkspace(id: string) {
		this.workspaceId = id;

		return this;
	}

	setConfig(config: ConnectionConfig) {
		this.config = config;

		return this;
	}

	setPlayer(player: Player) {
		this.player = player;
		return this;
	}

  setCharacters(characters: Character[]) {
    this.characters = characters;
    return this;
  }

  public setSessionAccessor(props: Accessor<SessionToken>) {
    this.sessionAccessor = props;

    return this;
  }

	private ensureGateway(gateway?: Gateway) {
		const hostname = gateway?.hostname ?? GRPC_HOSTNAME;
		const ssl = gateway?.ssl ?? true;
		return { hostname, ssl };
	}

  private ensureAutoConnectConfig(autoConnect?: AutoConnectConfig) {
    return {
      autoReconnect: autoConnect?.autoReconnect ?? false,
      disconnectTimeout: autoConnect?.disconnectTimeout ?? DEFAULT_DISCONNECT_TIMEOUT
    }
  }

  private ensureFeature(feature?: FeatureConfiguration) {
    return {
      emotion: feature?.emotion ?? false,
      inputFilter: feature?.inputFilter ?? false,
      command: feature?.command ?? false,
      memory: feature?.memory ?? false,
      reasoning: feature?.reasoning ?? false,
    };
  }

	public setOnOpen(fn: () => void) {
		this.onOpen = fn;

		return this;
	}

	public setOnError(fn: (err: ConnectionError) => void) {
		this.onError = fn;

		return this;
	}

	public setOnMessage(fn: (packet: SpawnerPacket) => void) {
		this.onMessage = fn;

		return this;
	}

	public setOnClose(fn: () => void) {
		this.onClose = fn;

		return this;
	}

	private validate() {
		if (!this.apiKey?.key || !this.apiKey.secret) {
			throw Error("Api key is required");
		}
		if (!this.workspaceId) {
			throw Error("Workspace ID is required");
		}
	}
}
