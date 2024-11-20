import { Timestamp, TimestampSchema } from "@bufbuild/protobuf/wkt";
import type { GenerateSessionTokenResponse } from "../../proto/spawner/main/v1/main_pb";
import { create } from "@bufbuild/protobuf";

interface SessionTokenProps {
	sessionId: string;
	token: string;
	tokenType: string;
	expireTime?: Date;
}

export class SessionToken {
	readonly sessionId: string;
	readonly token: string;
	readonly tokenType: string;
	readonly expireTime?: Date;

	constructor(props: SessionTokenProps) {
		this.sessionId = props.sessionId;
		this.token = props.token;
		this.tokenType = props.tokenType;
		this.expireTime = props.expireTime;
	}

	static isExpired(token: SessionToken) {
		if (!token.expireTime) {
			throw Error("Session token is not set expire time");
		}
		const { expireTime } = token;

		const timeDiff = new Date(expireTime).getTime() - new Date().getTime();
		return timeDiff <= 0;
	}

  private static timestampToDate(timestamp: Timestamp): Date {
    const millisFromSeconds = BigInt(timestamp.seconds) * BigInt(1000);
  
    const millisFromNanos = BigInt(timestamp.nanos) / BigInt(1_000_000);
  
    const totalMillis = millisFromSeconds + millisFromNanos;
    
    return new Date(Number(totalMillis));
}

	static convertProto(proto: GenerateSessionTokenResponse) {
    const data = create(TimestampSchema, proto.expireTime)
    data.nanos
    data.seconds
		return new SessionToken({
			sessionId: proto.sessionId,
			token: proto.token,
			tokenType: proto.tokenType,
			expireTime: this.timestampToDate(create(TimestampSchema, proto.expireTime))
		});
	}
}
