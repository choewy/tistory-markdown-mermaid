import { lastValueFrom } from 'rxjs';

import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { KakaoConfig } from '@app/conf';

import { OauthServiceImpl } from '../interfaces';
import { OauthProfileDto, OauthGetTokenParamsDto, OauthTokensDto } from '../dtos';

import { KakaoTokenResponseDto } from './dtos';

@Injectable()
export class KakaoOauthService implements OauthServiceImpl {
  constructor(private readonly config: KakaoConfig, private readonly httpService: HttpService) {}

  public getUrl(redirect_uri: string): string {
    const url = 'https://kauth.kakao.com/oauth/authorize';
    const qs = Object.entries({
      redirect_uri,
      client_id: this.config.getClientId(),
      response_type: 'code',
    })
      .map((v) => v.join('='))
      .join('&');

    return [url, qs].join('?');
  }

  async getProfile(accessToken: string): Promise<OauthProfileDto> {
    const url = 'https://kapi.kakao.com/v2/user/me';

    const { data } = await lastValueFrom(
      this.httpService.get(url, {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: { secure_resource: true },
      }),
    );

    return OauthProfileDto.kakaoOf(data);
  }

  async getTokens(params: OauthGetTokenParamsDto): Promise<OauthTokensDto> {
    const url = 'https://kauth.kakao.com/oauth/token';

    const { data } = await lastValueFrom(
      this.httpService.post<KakaoTokenResponseDto>(
        url,
        {},
        {
          params: {
            grant_type: 'authorization_code',
            client_id: this.config.getClientId(),
            client_secret: this.config.getClientSecret(),
            redirect_uri: params.redirectUri,
            code: params.code,
          },
        },
      ),
    );

    return OauthTokensDto.kakaoOf(data);
  }

  async refreshTokens(tokens: OauthTokensDto): Promise<OauthTokensDto> {
    const url = 'https://kauth.kakao.com/oauth/token';

    const { data } = await lastValueFrom(
      this.httpService.post<KakaoTokenResponseDto>(
        url,
        {},
        {
          params: {
            grant_type: 'refresh_token',
            client_id: this.config.getClientId(),
            client_secret: this.config.getClientSecret(),
            refresh_token: tokens.refreshToken,
          },
        },
      ),
    );

    if (!data.refresh_token) {
      data.refresh_token = tokens.refreshToken;
    }

    return OauthTokensDto.kakaoOf(data);
  }
}
