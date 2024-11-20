import { CreateWorldEvent, LoadWorldEvent, WorldController as ProtoWorldController, WorldControllerType as ProtoWorldControllerType } from "../../../proto/spawner/world/v1/world_pb";

enum WorldControllerType {
	UNSPECIFIED = "UNSPECIFIED",
	CREATE = "CREATE",
	LOAD = "LOAD"
}

interface WorldControllerProps {
	type: WorldControllerType;
	create?: CreateWorldEvent;
  load?: LoadWorldEvent; 
}

export class WorldController {
  readonly type: WorldControllerType = WorldControllerType.UNSPECIFIED;
  readonly create?: CreateWorldEvent;
  readonly load?: LoadWorldEvent;

  constructor(props: WorldControllerProps) {
    const { type } = props;

    if(type === WorldControllerType.CREATE){
      this.create = props.create;
    }
    
    if(type === WorldControllerType.LOAD){
      this.load = props.load;
    }
  }

  static convertProto(proto: ProtoWorldController) {
    const type = WorldController.getType(proto)
    const { payload } = proto
    const { value } = payload

    return new WorldController({
      type,
      ...(type === WorldControllerType.CREATE && {
				create: value as CreateWorldEvent,
			}),
      ...(type === WorldControllerType.LOAD && {
				load: value as LoadWorldEvent,
			})
    })
  }

  private static getType(proto: ProtoWorldController) {
		const { type } = proto;
		switch (type) {
			case ProtoWorldControllerType.CREATE:
				return WorldControllerType.CREATE;
			case ProtoWorldControllerType.LOAD:
				return WorldControllerType.LOAD;
			default:
				return WorldControllerType.UNSPECIFIED;
		}
	}
}