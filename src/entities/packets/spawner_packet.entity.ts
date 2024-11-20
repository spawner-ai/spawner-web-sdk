import { create } from "@bufbuild/protobuf";
import {
	type SpawnerPacket as ProtoPacket,
	SpawnerPacketType as ProtoSpawnerPacketType,
} from "../../../proto/spawner/packet/v1/packet_pb";
import { ChannelController } from "./channel_controller";
import { EmotionEvent } from "./emotion.entity";
import { PacketError } from "./error.entity";
import { InputFilterEvent } from "./input_filter.entity";
import { KnowledgeEvent } from "./knowledge.entity";
import { Routing } from "./routing.entity";
import { TextEvent } from "./text.entity";
import { SentimentEvent } from "./sentiment.entity";
import { PromptInjectionEvent } from "./prompt_injection.entity";
import { WorldController } from "./world_controller.entity";
import { Timestamp, TimestampSchema } from "@bufbuild/protobuf/wkt";
import { TextEvent as ProtoTextEvent } from "../../../proto/spawner/text/v1/text_pb";
import { EmotionEvent as ProtoEmotionEvent } from "../../../proto/spawner/emotion/v1/emotion_pb";
import { KnowledgeEvent as ProtoKnowledgeEvent } from "../../../proto/spawner/knowledge/v1/knowledge_pb";
import { InputFilterEvent as ProtoInputFilterEvent } from "../../../proto/spawner/input_filter/v1/input_filter_pb";
import { ChannelController as ProtoChannelController } from "../../../proto/spawner/channel/v1/channel_pb";
import { SentimentEvent as ProtoSentimentEvent } from "../../../proto/spawner/sentiment/v1/sentiment_pb";
import { PromptInjectionEvent as ProtoPromptInjectionEvent } from "../../../proto/spawner/prompt_injection/v1/prompt_injection_pb";
import { WorldController as ProtoWorldController } from "../../../proto/spawner/world/v1/world_pb";

enum SpawnerPacketType {
	UNSPECIFIED = "UNSPECIFIED",
	SESSION_CONTROLLER = "SESSION_CONTROLLER",
	CHANNEL_CONTROLLER = "CHANNEL_CONTROLLER",
	TEXT = "TEXT",
	INPUT_FILTER = "INPUT_FILTER",
	EMOTION = "EMOTION",
	KNOWLEDGE = "KNOWLEDGE",
  SENTIMENT = "SENTIMENT",
  PROMPT_INJECTION = "PROMPT_INJECTION",
  WORLD_CONTROLLER = "WORLD_CONTROLLER"
}

export interface SpawnerPacketProps {
	type: SpawnerPacketType;
	date?: Date;
	routing?: Routing;
	success: boolean;
	error?: PacketError;
	text?: TextEvent;
	emotion?: EmotionEvent;
	knowledge?: KnowledgeEvent;
	inputFilter?: InputFilterEvent;
	channelController?: ChannelController;
  sentiment?: SentimentEvent;
  promptInjection?: PromptInjectionEvent;
  worldController?: WorldController;
}

export class SpawnerPacket {
	private type: SpawnerPacketType = SpawnerPacketType.UNSPECIFIED;

	readonly date?: Date;
	readonly routing?: Routing;
	readonly success: boolean;
	readonly error?: PacketError;

	readonly text?: TextEvent;
	readonly emotion?: EmotionEvent;
	readonly knowledge?: KnowledgeEvent;
	readonly inputFilter?: InputFilterEvent;
	readonly channelController?: ChannelController;
  readonly sentiment?: SentimentEvent;
  readonly promptInjection?: PromptInjectionEvent;
  readonly worldController?: WorldController;

	constructor(props: SpawnerPacketProps) {
		const { date, type, routing, success, error } = props;
		this.date = date;
		this.type = type;
		this.routing = routing;
		this.success = success;

		if (!success) {
			this.error = error;
		}

		if (this.isText()) {
			this.text = props.text;
		}
		if (this.isEmotion()) {
			this.emotion = props.emotion;
		}
		if (this.isKnowledge()) {
			this.knowledge = props.knowledge;
		}
		if (this.isInputFilter()) {
			this.inputFilter = props.inputFilter;
		}
		if (this.isChannelController()) {
			this.channelController = props.channelController;
		}
    if (this.isSentiment()) {
			this.sentiment = props.sentiment;
		}
    if (this.isPromptInjection()) {
			this.promptInjection = props.promptInjection;
		}
    if (this.isWorldController()) {
			this.worldController = props.worldController;
		}
	}

	isText() {
		return this.type === SpawnerPacketType.TEXT;
	}

	isEmotion() {
		return this.type === SpawnerPacketType.EMOTION;
	}

	isKnowledge() {
		return this.type === SpawnerPacketType.KNOWLEDGE;
	}

	isInputFilter() {
		return this.type === SpawnerPacketType.INPUT_FILTER;
	}

	isSessionController() {
		return this.type === SpawnerPacketType.SESSION_CONTROLLER;
	}

	isChannelController() {
		return this.type === SpawnerPacketType.CHANNEL_CONTROLLER;
	}

  isSentiment() {
		return this.type === SpawnerPacketType.SENTIMENT;
	}

  isPromptInjection() {
    return this.type === SpawnerPacketType.PROMPT_INJECTION;
  }

  isWorldController() {
    return this.type === SpawnerPacketType.WORLD_CONTROLLER;
  }

  private static timestampToDate(timestamp: Timestamp): Date {
    const millisFromSeconds = BigInt(timestamp.seconds) * BigInt(1000);
  
    const millisFromNanos = BigInt(timestamp.nanos) / BigInt(1_000_000);
  
    const totalMillis = millisFromSeconds + millisFromNanos;
    
    return new Date(Number(totalMillis));
  }

	static convertProto(proto: ProtoPacket): SpawnerPacket {
		const type = SpawnerPacket.getType(proto);
		const { timestamp, routing, success, error, payload } = proto;
		const { value } = payload;

		return new SpawnerPacket({
			type,
			date: this.timestampToDate(create(TimestampSchema, timestamp)),
			routing: routing && Routing.convertProto(routing),
			success,
			...(success && {
				error: error && PacketError.convertProto(error),
			}),
			...(type === SpawnerPacketType.TEXT && {
				text: TextEvent.convertProto(value as ProtoTextEvent),
			}),
			...(type === SpawnerPacketType.EMOTION && {
				emotion: EmotionEvent.convertProto(value as ProtoEmotionEvent),
			}),
			...(type === SpawnerPacketType.KNOWLEDGE && {
				knowledge: KnowledgeEvent.convertProto(value as ProtoKnowledgeEvent),
			}),
			...(type === SpawnerPacketType.INPUT_FILTER && {
				inputFilter: InputFilterEvent.convertProto(value as ProtoInputFilterEvent),
			}),
			...(type === SpawnerPacketType.CHANNEL_CONTROLLER && {
				channelController: ChannelController.convertProto(value as ProtoChannelController),
			}),
      ...(type === SpawnerPacketType.SENTIMENT && {
				sentiment: SentimentEvent.convertProto(value as ProtoSentimentEvent),
			}),
      ...(type === SpawnerPacketType.PROMPT_INJECTION && {
				promptInjection: PromptInjectionEvent.convertProto(value as ProtoPromptInjectionEvent),
			}),
      ...(type === SpawnerPacketType.WORLD_CONTROLLER && {
				worldController: WorldController.convertProto(value as ProtoWorldController),
			}),
		});
	}

	private static getType(proto: ProtoPacket) {
		const { type } = proto;
		switch (type) {
			case ProtoSpawnerPacketType.TEXT:
				return SpawnerPacketType.TEXT;
			case ProtoSpawnerPacketType.EMOTION:
				return SpawnerPacketType.EMOTION;
			case ProtoSpawnerPacketType.KNOWLEDGE:
				return SpawnerPacketType.KNOWLEDGE;
			case ProtoSpawnerPacketType.INPUT_FILTER:
				return SpawnerPacketType.INPUT_FILTER;
			case ProtoSpawnerPacketType.CHANNEL_CONTROLLER:
				return SpawnerPacketType.CHANNEL_CONTROLLER;
      case ProtoSpawnerPacketType.SENTIMENT:
        return SpawnerPacketType.SENTIMENT;
      case ProtoSpawnerPacketType.PROMPT_INJECTION:
        return SpawnerPacketType.PROMPT_INJECTION;
      case ProtoSpawnerPacketType.WORLD_CONTROLLER:
        return SpawnerPacketType.WORLD_CONTROLLER;
			default:
				return SpawnerPacketType.UNSPECIFIED;
		}
	}
}
