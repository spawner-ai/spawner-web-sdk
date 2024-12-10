import type { PlayerActor } from "../../proto/spawner/actor/v1/actor_pb";

type AgeGroup = "NONE" | "CHILD" | "TEEN" | "ADULT" | "ELDERLY";
type Gender = "NONE" | "MALE" | "FEMALE";
export interface PlayerProps {
	id: string;
	display_name: string;
	age_group?: AgeGroup;
	gender?: Gender;
	description?: string;
}

export class Player {
	readonly id: string;
	readonly display_name: string;
	readonly age_group?: string;
	readonly gender?: string;
	readonly description?: string;

	constructor(props: PlayerProps) {
		const { id, display_name, age_group, gender, description } = props;
		this.id = id;
		this.display_name = display_name;
		this.age_group = age_group;
		this.gender = gender;
		this.description = description;
	}

  private static validateData<T>(data: string, validValues: T[]): T {
    let out: T;
    if (validValues.indexOf(data as T) !== -1) {
        out = data as T;
        return out;
    }
    console.warn(`${data} is not a valid value.`);
    out = "NONE" as T;
    return out;
}


	static convertProto(props: PlayerActor) {
		const { id, displayName, ageGroup, gender, description } = props;

		// validate age group
		const validAgeGroups: AgeGroup[] = [
			"NONE",
			"CHILD",
			"TEEN",
			"ADULT",
			"ELDERLY",
		];
		const _ageGroup = Player.validateData<AgeGroup>(ageGroup, validAgeGroups);

		// validate gender
		const validGender: Gender[] = ["NONE", "MALE", "FEMALE"];
		const _gender = Player.validateData<Gender>(gender, validGender);

		return new Player({
			id,
			display_name: displayName,
			age_group: _ageGroup,
			gender: _gender,
			description,
		});
	}
}
