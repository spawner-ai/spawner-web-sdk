import type { ErrorEvent as ProtoErrorEvent } from "../../../proto/spawner/error/v1/error_pb";
import { StatusCode as ProtoStatusCode } from "../../../proto/spawner/error/v1/error_pb";

enum StatusCode {
	UNSPECIFIED = "UNSPECIFIED",
	OK = "OK",
	CANCELLED = "CANCELLED",
	UNKNOWN = "UNKNOWN",
	INVALID_ARGUMENT = "INVALID_ARGUMENT",
	DEADLINE_EXCEEDED = "DEADLINE_EXCEEDED",
	NOT_FOUND = "NOT_FOUND",
	ALREADY_EXISTS = "ALREADY_EXISTS",
	PERMISSION_DENIED = "PERMISSION_DENIED",
	RESOURCE_EXHAUSTED = "RESOURCE_EXHAUSTED",
	FAILED_PRECONDITION = "FAILED_PRECONDITION",
	ABORTED = "ABORTED",
	OUT_OF_RANGE = "OUT_OF_RANGE",
	UNIMPLEMENTED = "UNIMPLEMENTED",
	INTERNAL = "INTERNAL",
	UNAVAILABLE = "UNAVAILABLE",
	DATA_LOSS = "DATA_LOSS",
	UNAUTHENTICATED = "UNAUTHENTICATED",
}

interface PacketErrorProps {
	code: StatusCode;
	message: string;
}

export class PacketError {
	readonly code: StatusCode;
	readonly message: string;

	constructor(props: PacketErrorProps) {
		this.code = props.code;
		this.message = props.message;
	}

	static convertProto(proto: ProtoErrorEvent) {
		const code = PacketError.getCode(proto);
		const { message } = proto;

		return new PacketError({
			code,
			message,
		});
	}

	private static getCode(proto: ProtoErrorEvent) {
		const { code } = proto;
		switch (code) {
			case ProtoStatusCode.OK:
				return StatusCode.OK;
			case ProtoStatusCode.CANCELLED:
				return StatusCode.CANCELLED;
			case ProtoStatusCode.UNKNOWN:
				return StatusCode.UNKNOWN;
			case ProtoStatusCode.INVALID_ARGUMENT:
				return StatusCode.INVALID_ARGUMENT;
			case ProtoStatusCode.DEADLINE_EXCEEDED:
				return StatusCode.DEADLINE_EXCEEDED;
			case ProtoStatusCode.NOT_FOUND:
				return StatusCode.NOT_FOUND;
			case ProtoStatusCode.ALREADY_EXISTS:
				return StatusCode.ALREADY_EXISTS;
			case ProtoStatusCode.PERMISSION_DENIED:
				return StatusCode.PERMISSION_DENIED;
			case ProtoStatusCode.RESOURCE_EXHAUSTED:
				return StatusCode.RESOURCE_EXHAUSTED;
			case ProtoStatusCode.FAILED_PRECONDITION:
				return StatusCode.FAILED_PRECONDITION;
			case ProtoStatusCode.ABORTED:
				return StatusCode.ABORTED;
			case ProtoStatusCode.OUT_OF_RANGE:
				return StatusCode.OUT_OF_RANGE;
			case ProtoStatusCode.UNIMPLEMENTED:
				return StatusCode.UNIMPLEMENTED;
			case ProtoStatusCode.INTERNAL:
				return StatusCode.INTERNAL;
			case ProtoStatusCode.UNAVAILABLE:
				return StatusCode.UNAVAILABLE;
			case ProtoStatusCode.DATA_LOSS:
				return StatusCode.DATA_LOSS;
			case ProtoStatusCode.UNAUTHENTICATED:
				return StatusCode.UNAUTHENTICATED;
			default:
				return StatusCode.UNSPECIFIED;
		}
	}
}
