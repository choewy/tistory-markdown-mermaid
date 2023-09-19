export enum UserType {
  VIEWER = 'viewer',
  CREATOR = 'creator',
}

export enum UserStatus {
  ACTIVE = 'active',
  BLOCK = 'block',
  WITHDRAW = 'withdraw',
}

export enum UserOauthPlatform {
  TWITCH = 'twitch',
  GOOGLE = 'google',
  KAKAO = 'kakao',
  NAVER = 'naver',
}

export enum UserOauthStatus {
  LINKED = 'linked',
  UNLINKED = 'unlinked',
}

export enum UserProfileType {
  STICKYBOMB = 'stickybomb',
  OAUTH = 'oauth',
}
