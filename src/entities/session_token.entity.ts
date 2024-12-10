import { Timestamp, TimestampSchema } from '@bufbuild/protobuf/wkt'
import type { GenerateSessionTokenResponse, GetSessionResponse, RefreshSessionTokenResponse } from '../../proto/spawner/main/v1/main_pb'
import { create } from '@bufbuild/protobuf'

interface SessionTokenProps {
  sessionId: string
  token: string
  tokenType: string
  expireTime?: Date
  refreshToken?: string
}

export class SessionToken {
  readonly sessionId: string
  readonly token: string
  readonly tokenType: string
  readonly expireTime?: Date
  readonly refreshToken?: string

  constructor(props: SessionTokenProps) {
    this.sessionId = props.sessionId
    this.token = props.token
    this.tokenType = props.tokenType
    this.expireTime = props.expireTime
    this.refreshToken = props.refreshToken
  }

  static isExpired(token: SessionToken) {
    if (!token.expireTime) {
      throw Error('Session token is not set expire time')
    }
    const { expireTime } = token

    const timeDiff = new Date(expireTime).getTime() - new Date().getTime()
    return timeDiff <= 0
  }

  private static timestampToDate(timestamp: Timestamp): Date {
    const millisFromSeconds = BigInt(timestamp.seconds) * BigInt(1000)

    const millisFromNanos = BigInt(timestamp.nanos) / BigInt(1_000_000)

    const totalMillis = millisFromSeconds + millisFromNanos

    return new Date(Number(totalMillis))
  }

  private static isSessionTokenResponse(proto: GenerateSessionTokenResponse | RefreshSessionTokenResponse): proto is GenerateSessionTokenResponse {
    return (proto as GenerateSessionTokenResponse).refreshToken !== undefined
  }

  static convertProto(proto: GenerateSessionTokenResponse | RefreshSessionTokenResponse) {
    if (SessionToken.isSessionTokenResponse(proto)) {
      const { sessionId, token, tokenType, expireTime, refreshToken } = proto
      const timestamp = create(TimestampSchema, expireTime)
      return new SessionToken({
        sessionId,
        token,
        tokenType,
        expireTime: this.timestampToDate(timestamp),
        refreshToken,
      })
    }
    else {
      const { sessionId, token, tokenType, expireTime } = proto
      const timestamp = create(TimestampSchema, expireTime)
      return new SessionToken({
        sessionId,
        token,
        tokenType,
        expireTime: this.timestampToDate(timestamp),
      })
    }
  }
}

interface SessionProps {
  sessionId: string
  expireTime: Date
  isExpired: boolean
  currentChannelId: string
}

export class Session {
  readonly sessionId: string
  readonly expireTime?: Date
  readonly isExpired: boolean
  readonly currentChannelId?: string

  constructor(props: SessionProps) {
    this.sessionId = props.sessionId
    this.expireTime = props.expireTime
    this.isExpired = props.isExpired
    this.currentChannelId = props.currentChannelId
  }

  private static timestampToDate(timestamp: Timestamp): Date {
    const millisFromSeconds = BigInt(timestamp.seconds) * BigInt(1000)

    const millisFromNanos = BigInt(timestamp.nanos) / BigInt(1_000_000)

    const totalMillis = millisFromSeconds + millisFromNanos

    return new Date(Number(totalMillis))
  }

  static convertProto(proto: GetSessionResponse) {
    const { sessionId, expireTime, isExpired, currentChannelId } = proto
    const timestamp = create(TimestampSchema, expireTime)
    return new Session({
      sessionId,
      expireTime: this.timestampToDate(timestamp),
      isExpired,
      currentChannelId,
    })
  }
}
