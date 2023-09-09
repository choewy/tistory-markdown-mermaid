import Decimal from 'decimal.js';
import { lastValueFrom } from 'rxjs';
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { NaverConfig } from '@app/conf';

import { OauthServiceImpl } from '../interfaces';
import { OauthProfileDto, OauthGetTokenParamsDto, OauthTokensDto } from '../dtos';

import { NaverOauthProfileResponseDto } from './dtos';
import { KakaoTokenResponseDto } from '../kakao';

@Injectable()
export class NaverOauthService implements OauthServiceImpl {
  constructor(private readonly config: NaverConfig, private readonly httpService: HttpService) {}

  public getUrl(redirect_uri: string): string {
    const url = 'https://nid.naver.com/oauth2.0/authorize';
    const qs = Object.entries({
      redirect_uri,
      response_type: 'code',
      state: new Decimal(Math.random() * 1000).toFixed(0),
    })
      .map((v) => v.join('='))
      .join('&');

    return [url, qs].join('?');
  }

  async getProfile(accessToken: string): Promise<OauthProfileDto> {
    const url = 'https://openapi.naver.com/v1/nid/me';

    const { data } = await lastValueFrom(
      this.httpService.get<NaverOauthProfileResponseDto>(url, {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: { secure_resource: true },
      }),
    );

    return OauthProfileDto.naverOf(data);
  }

  async getTokens(params: OauthGetTokenParamsDto): Promise<OauthTokensDto> {
    const url = 'https://nid.naver.com/oauth2.0/token';

    const { data } = await lastValueFrom(
      this.httpService.get<KakaoTokenResponseDto>(url, {
        params: {
          grant_type: 'authorization_code',
          client_id: this.config.getClientId(),
          client_secret: this.config.getClientSecret(),
          code: params.code,
          state: params.state,
        },
      }),
    );

    return OauthTokensDto.kakaoOf(data);
  }

  async refreshTokens(tokens: OauthTokensDto): Promise<OauthTokensDto> {
    const url = 'https://nid.naver.com/oauth2.0/token';

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

    data.refresh_token = tokens.refreshToken;

    return OauthTokensDto.kakaoOf(data);
  }
}
