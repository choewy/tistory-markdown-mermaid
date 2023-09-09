import { TwitchOauthProfileResponseDto, TwitchTokenResponseDto } from './twitch';
import { GoogleOauthChannelIdResponseDto, GoogleOauthProfileResponseDto, GoogleTokenResponseDto } from './google';
import { KakaoOauthProfileResponseDto, KakaoTokenResponseDto } from './kakao';
import { NaverOauthProfileResponseDto, NaverTokenResponseDto } from './naver';

export class OauthProfileDto {
  id: string;
  nickname: string;
  email: string;
  image: string | null;
  url: string | null;

  public static twitchOf(o: TwitchOauthProfileResponseDto) {
    const dto = new OauthProfileDto();

    dto.id = o.id;
    dto.nickname = o.nickname;
    dto.email = o.email;
    dto.image = o.imageUrl || null;
    dto.url = o.liveUrl;

    return dto;
  }

  public static googleOf(o: GoogleOauthProfileResponseDto, c: GoogleOauthChannelIdResponseDto | null) {
    const dto = new OauthProfileDto();

    dto.id = o.sub;
    dto.nickname = o.name;
    dto.email = o.name;
    dto.image = o.picture;
    dto.url = c === null ? null : c.id;

    return dto;
  }

  public static kakaoOf(o: KakaoOauthProfileResponseDto) {
    const dto = new OauthProfileDto();

    dto.id = o.id;
    dto.nickname = o.kakao_account.profile.nickname;
    dto.email = o.kakao_account.email || null;
    dto.image = o.kakao_account.profile.profile_image_url || null;
    dto.url = null;

    return dto;
  }

  public static naverOf(o: NaverOauthProfileResponseDto) {
    const dto = new OauthProfileDto();

    dto.id = o.id;
    dto.nickname = o.nickname;
    dto.email = o.email;
    dto.image = o.profile_image;
    dto.url = null;

    return dto;
  }
}

export class OauthGetTokenParamsDto {
  code: string;
  redirectUri?: string;
  state?: number;
}

export class OauthTokensDto {
  accessToken: string;
  refreshToken: string;

  public static twitchOf(o: TwitchTokenResponseDto) {
    const dto = new OauthTokensDto();

    dto.accessToken = o.access_token;
    dto.refreshToken = o.refresh_token;

    return dto;
  }

  public static googleOf(o: GoogleTokenResponseDto) {
    const dto = new OauthTokensDto();

    dto.accessToken = o.access_token;
    dto.refreshToken = o.refresh_token;

    return dto;
  }

  public static kakaoOf(o: KakaoTokenResponseDto) {
    const dto = new OauthTokensDto();

    dto.accessToken = o.access_token;
    dto.refreshToken = o.refresh_token;

    return dto;
  }

  public static naverOf(o: NaverTokenResponseDto) {
    const dto = new OauthTokensDto();

    dto.accessToken = o.access_token;
    dto.refreshToken = o.refresh_token;

    return dto;
  }
}
