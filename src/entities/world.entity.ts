import { CreateWorldEvent, AgentConfiguration, LoadWorldEvent } from "../../proto/spawner/world/v1/world_pb";
import { Character } from "./character.entity";

export interface WorldProps {
  id: string;
  characters: Character[]
}

export class World {
  readonly id: string;
  readonly characters: Character[];
  
  constructor(props: WorldProps) {
    const { id, characters } = props
    this.id = id;
    this.characters = characters;
  }

  static convertProto(proto: CreateWorldEvent | LoadWorldEvent) {
    const { worldId, agents } = proto

    return new World({
      id: worldId,
      characters: agents.map(agent => Character.convertProto(agent))
    })
  }
}