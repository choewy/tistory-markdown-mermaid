export class GoogleTokenResponseDto {
  access_token: string;
  refresh_token: string;
}

export class GoogleOauthProfileResponseDto {
  sub: string;
  name: string;
  email: string;
  picture: string | null;
}

export class GoogleOauthChannelIdResponseDto {
  id: string;
}
