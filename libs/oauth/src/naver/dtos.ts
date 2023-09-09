export class NaverTokenResponseDto {
  access_token: string;
  refresh_token: string;
}

export class NaverOauthProfileResponseDto {
  id: string;
  nickname: string;
  email: string;
  profile_image: string;
}
