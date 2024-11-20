import {
	type KnowledgeEvent as ProtoKnowledgeEvent,
	type KnowledgeReference as ProtoKnowledgeReference,
	type KnowledgeSource as ProtoKnowledgeSource,
	KnowledgeSourceType as ProtoKnowledgeSourceType,
} from "../../../proto/spawner/knowledge/v1/knowledge_pb";

enum KnowledgeSourceType {
	UNSPECIFIED = "UNSPECIFIED",
	MANUAL = "MANUAL",
	WEB = "WEB",
}

interface KnowledgeSourceProps {
	type: KnowledgeSourceType;
	uri: string;
}

class KnowledgeSource {
	private type: KnowledgeSourceType = KnowledgeSourceType.UNSPECIFIED;
	readonly uri: string;

	constructor(props: KnowledgeSourceProps) {
		this.type = props.type;
		this.uri = props.uri;
	}
	static convertProto(proto: ProtoKnowledgeSource) {
		const type = KnowledgeSource.getType(proto);
		return new KnowledgeSource({
			type,
			uri: proto.uri,
		});
	}

	private static getType(proto: ProtoKnowledgeSource) {
		const { type } = proto;
		switch (type) {
			case ProtoKnowledgeSourceType.MANUAL:
				return KnowledgeSourceType.MANUAL;
			case ProtoKnowledgeSourceType.WEB:
				return KnowledgeSourceType.WEB;
			default:
				return KnowledgeSourceType.UNSPECIFIED;
		}
	}
}

interface KnowledgeReferenceProps {
	name: string;
	source?: KnowledgeSource;
}

class KnowledgeReference {
	readonly name: string;
	readonly source?: KnowledgeSource;

	constructor(props: KnowledgeReferenceProps) {
		this.name = props.name;
		this.source = props.source;
	}
	static convertProto(proto: ProtoKnowledgeReference) {
		return new KnowledgeReference({
			name: proto.name,
			source: proto.source && KnowledgeSource.convertProto(proto.source),
		});
	}
}

interface KnowledgeEventProps {
	utteranceId: string;
	references: KnowledgeReference[];
}

export class KnowledgeEvent {
	readonly utteranceId: string;
	readonly references: KnowledgeReference[];

	constructor(props: KnowledgeEventProps) {
		const { utteranceId, references } = props;
		this.utteranceId = utteranceId;
		this.references = references;
	}
	static convertProto(proto: ProtoKnowledgeEvent) {
		const { utteranceId, references } = proto;
		return new KnowledgeEvent({
			utteranceId,
			references: references.map((r) => KnowledgeReference.convertProto(r)),
		});
	}
}
