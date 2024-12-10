import { AgentConfiguration } from '../../proto/spawner/world/v1/world_pb'
import { AgentActor } from '../../proto/spawner/actor/v1/actor_pb'

interface Agent {
  id: string
  blueprintId?: string
  displayName?: string
  objective?: string
}

export interface CharacterProps {
  customId?: string
  name?: string
  agent?: Agent
}

export class Character {
  readonly customId?: string
  readonly name?: string
  readonly agent?: Agent

  constructor(props: CharacterProps) {
    const { customId, name, agent } = props
    this.customId = customId
    this.name = name
    this.agent = agent
  }

  private static isAgentConfiguration(proto: AgentConfiguration | AgentActor): proto is AgentConfiguration {
    return (proto as AgentConfiguration).blueprintId !== undefined
  }

  static convertProto(proto: AgentConfiguration | AgentActor) {
    if (this.isAgentConfiguration(proto)) {
      const { id, blueprintId, displayName, character, objective } = proto
      if (!character?.customId) {
        throw Error('Character custom id is undefined.')
      }
      return new Character({
        customId: character?.customId,
        name: character.name,
        agent: {
          id,
          blueprintId,
          displayName,
          objective,
        },
      })
    }
    else {
      const { id } = proto
      return new Character({
        agent: {
          id,
        },
      })
    }
  }
}
