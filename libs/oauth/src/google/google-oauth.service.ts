import { lastValueFrom } from 'rxjs';
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { GoogleConfig } from '@app/conf';

import { OauthServiceImpl } from '../interfaces';
import { OauthProfileDto, OauthGetTokenParamsDto, OauthTokensDto } from '../dtos';

import { GoogleOauthChannelIdResponseDto, GoogleOauthProfileResponseDto, GoogleTokenResponseDto } from './dtos';

@Injectable()
export class GoogleOauthService implements OauthServiceImpl {
  constructor(private readonly config: GoogleConfig, private readonly httpService: HttpService) {}

  public getUrl(redirect_uri: string): string {
    const url = 'https://accounts.google.com/o/oauth2/v2/auth';
    const qs = Object.entries({
      redirect_uri,
      client_id: this.config.getClientId(),
      response_type: 'code',
      access_type: 'offline',
      prompt: 'consent',
      scope: [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/youtube.readonly',
      ].join(' '),
    })
      .map((v) => v.join('='))
      .join('&');

    return [url, qs].join('?');
  }

  async getProfile(accessToken: string): Promise<OauthProfileDto> {
    const url = 'https://www.googleapis.com/oauth2/v3/userinfo';

    const { data } = await lastValueFrom(
      this.httpService.get<GoogleOauthProfileResponseDto>(url, {
        headers: { Authorization: `Bearer ${accessToken}` },
      }),
    );

    return OauthProfileDto.googleOf(data, await this.getChannelId(accessToken));
  }

  async getTokens(params: OauthGetTokenParamsDto): Promise<OauthTokensDto> {
    const url = 'https://oauth2.googleapis.com/token';

    const { data } = await lastValueFrom(
      this.httpService.post<GoogleTokenResponseDto>(url, {
        grant_type: 'authorization_code',
        client_id: this.config.getClientId(),
        client_secret: this.config.getClientSecret(),
        redirect_uri: params.redirectUri,
        code: params.code,
      }),
    );

    return OauthTokensDto.googleOf(data);
  }

  async refreshTokens(tokens: OauthTokensDto): Promise<OauthTokensDto> {
    const url = 'https://oauth2.googleapis.com/token';

    const { data } = await lastValueFrom(
      this.httpService.post<GoogleTokenResponseDto>(url, {
        grant_type: 'authorization_code',
        client_id: this.config.getClientId(),
        client_secret: this.config.getClientSecret(),
        refresh_token: tokens.refreshToken,
      }),
    );

    if (!data.refresh_token) {
      data.refresh_token = tokens.refreshToken;
    }

    return OauthTokensDto.googleOf(data);
  }

  async getChannelId(accessToken: string): Promise<GoogleOauthChannelIdResponseDto | null> {
    const url = 'https://www.googleapis.com/youtube/v3/channels';

    const { data } = await lastValueFrom(
      this.httpService.get<{ items: GoogleOauthChannelIdResponseDto[] }>(url, {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: { part: 'id', mine: true },
      }),
    );

    return data.items.length ? data.items[0] : null;
  }
}
