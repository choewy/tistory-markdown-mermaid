export class TwitchTokenResponseDto {
  access_token: string;
  refresh_token: string;
}

export class TwitchOauthProfileResponseDto {
  id: string;
  nickname: string;
  email: string;
  imageUrl: string | null;
  liveUrl: string | null;
}
