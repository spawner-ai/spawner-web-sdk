import type { TextEvent as ProtoText } from "../../../proto/spawner/text/v1/text_pb";
import type { CommandTriggered as ProtoCommandTriggered } from "../../../proto/spawner/text/v1/text_pb";

interface CommandTriggeredProps {
  name: string
  customId: string
}

export class CommandTriggered {
  readonly name;
  readonly customId;

  constructor(props: CommandTriggeredProps){
    const { name, customId } = props
    this.name = name;
    this.customId = customId
  }

  static convertProto(proto: ProtoCommandTriggered){
    return new CommandTriggered({
      name: proto.name,
      customId: proto.customId
    })
  }
}

interface TextProps {
	utteranceId: string;
	text: string;
	delta: string;
	final: boolean;
  command?: CommandTriggered;
}

export class TextEvent {
	readonly utteranceId: string;
	readonly text: string;
	readonly delta: string;
	readonly final: boolean;
  readonly command?: CommandTriggered;

	constructor(props: TextProps) {
		const { utteranceId, text, delta, final, command } = props;
		this.utteranceId = utteranceId;
		this.text = text;
		this.delta = delta;
		this.final = final;
    this.command = command;
	}

	static convertProto(proto: ProtoText) {
    const { utteranceId, text, delta, final, command} =proto
		return new TextEvent({
			utteranceId: utteranceId,
			text: text,
			delta: delta,
			final: final,
      command: command && CommandTriggered.convertProto(command)
		});
	}
}
