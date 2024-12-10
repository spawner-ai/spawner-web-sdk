import {
  type Routing as ProtoRouting,
} from '../../../proto/spawner/routing/v1/routing_pb'
import type { EventActor } from '../../../proto/spawner/routing/v1/routing_pb'

interface RoutingProps {
  source?: EventActor
  target?: EventActor
}

export class Routing {
  readonly source?: EventActor
  readonly target?: EventActor

  constructor(props: RoutingProps) {
    this.source = props.source
    this.target = props.target
  }

  static convertProto(proto: ProtoRouting) {
    const { source, target } = proto
    return new Routing({
      source,
      target,
    })
  }
}
