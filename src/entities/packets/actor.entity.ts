import type { Actor as ProtoActor } from '../../../proto/spawner/actor/v1/actor_pb'

import { Character } from '../character.entity'
import { Player } from '../player.entity'

interface ActorProps {
  players: Player[]
  characters: Character[]
}

export class Actor {
  readonly players: Player[]
  readonly characters: Character[]

  constructor(props: ActorProps) {
    const { players, characters } = props
    this.players = players
    this.characters = characters
  }

  static convertProto(proto: ProtoActor) {
    const { players, agents } = proto
    return new Actor({
      players: players.map(p => Player.convertProto(p)),
      characters: agents.map(c => Character.convertProto(c)),
    })
  }
}
