import { Injectable } from '@nestjs/common';

import { OauthServiceImpl } from './interfaces';
import { OauthProfileDto, OauthGetTokenParamsDto, OauthTokensDto } from './dtos';
import { TwitchOauthService } from './twitch';
import { GoogleOauthService } from './google';
import { KakaoOauthService } from './kakao';
import { NaverOauthService } from './naver';

@Injectable()
export class OauthService {
  constructor(
    private readonly twitchOauthService: TwitchOauthService,
    private readonly googleOauthService: GoogleOauthService,
    private readonly kakaoOauthService: KakaoOauthService,
    private readonly naverOauthService: NaverOauthService,
  ) {}

  private getService(platform: string): OauthServiceImpl {
    switch (platform) {
      case 'twitch':
        return this.twitchOauthService;

      case 'google':
        return this.googleOauthService;

      case 'kakao':
        return this.kakaoOauthService;

      case 'naver':
        return this.naverOauthService;
    }
  }

  public getUrl(platform: string, redirectUri: string): string {
    return this.getService(platform).getUrl(redirectUri);
  }

  async getProfile(platform: string, accessToken: string): Promise<OauthProfileDto> {
    return this.getService(platform)
      .getProfile(accessToken)
      .catch((e) => {
        throw e;
      });
  }

  async getTokens(platform: string, params: OauthGetTokenParamsDto): Promise<OauthTokensDto> {
    return this.getService(platform)
      .getTokens(params)
      .catch((e) => {
        throw e;
      });
  }

  async refreshTokens(platform: string, tokens: OauthTokensDto): Promise<OauthTokensDto> {
    return this.getService(platform)
      .refreshTokens(tokens)
      .catch((e) => {
        throw e;
      });
  }
}
