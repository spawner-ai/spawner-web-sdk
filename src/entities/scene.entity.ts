// deprecated
// import type { Scene as ProtoScene } from "../../proto/spawner/scene/v1/scene_pb";
// import type { SceneMutationEvent as ProtoSceneMutationEvent } from "../../proto/spawner/scene/v1/scene_pb";
// import { Character } from "./character.entity";

// interface SceneMutationEventProps {
// 	description: string;
// 	characters: Character[];
// }

// export class SceneMutationEvent {
// 	readonly description: string;
// 	readonly characters: Character[];

// 	constructor(props: SceneMutationEventProps) {
// 		this.description = props.description;
// 		this.characters = props.characters;
// 	}

// 	static convertProto(proto: ProtoSceneMutationEvent) {
// 		const { description, characters } = proto;
// 		return new SceneMutationEvent({
// 			description,
// 			characters: characters.map((c) => Character.convertProto(c)),
// 		});
// 	}
// }

// export interface SceneProps {
// 	id: string;
// 	characters?: Character[];
// 	description: string;
// }

// export class Scene {
// 	readonly id?: string;
// 	readonly characters?: Character[];
// 	readonly description?: string;

// 	constructor(props: SceneProps) {
// 		const { id, characters, description } = props;
// 		if (!id && !description) {
// 			throw new Error("Either id or description must be provided.");
// 		}
// 		this.id = id;
// 		this.characters = characters ?? [];
// 		this.description = description;
// 	}

// 	static convertProto(proto: ProtoScene) {
// 		return new Scene({
// 			id: proto.customId,
// 			characters: proto.characters.map((c) => Character.convertProto(c)),
// 			description: proto.description,
// 		});
// 	}
// }
