export class KakaoTokenResponseDto {
  access_token: string;
  refresh_token: string;
}

export class KakaoOauthProfileResponseDto {
  id: string;
  kakao_account: {
    email: string;
    profile: { nickname: string; profile_image_url: string };
  };
}
