import { lastValueFrom } from 'rxjs';

import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { TwitchConfig } from '@app/conf';

import { OauthServiceImpl } from '../interfaces';
import { OauthGetTokenParamsDto, OauthProfileDto, OauthTokensDto } from '../dtos';

import { TwitchOauthProfileResponseDto, TwitchTokenResponseDto } from './dtos';

@Injectable()
export class TwitchOauthService implements OauthServiceImpl {
  constructor(private readonly config: TwitchConfig, private readonly httpService: HttpService) {}

  async getProfile(accessToken: string): Promise<OauthProfileDto> {
    const url = 'https://api.twitch.tv/helix/users';

    const { data } = await lastValueFrom(
      this.httpService.get<{ data: [TwitchOauthProfileResponseDto] }>(url, {
        headers: {
          'Client-ID': this.config.getClientId(),
          Authorization: `Baerer ${accessToken}`,
        },
      }),
    );

    return OauthProfileDto.twitchOf(data.data[0]);
  }

  async getTokens(params: OauthGetTokenParamsDto): Promise<OauthTokensDto> {
    const url = 'https://id.twitch.tv/oauth2/token';

    const { data } = await lastValueFrom(
      this.httpService.post<TwitchTokenResponseDto>(url, {
        grant_type: 'client_credentials',
        client_id: this.config.getClientId(),
        client_secret: this.config.getClientSecret(),
        redirect_uri: params.redirectUri,
        code: params.code,
      }),
    );

    return OauthTokensDto.twitchOf(data);
  }

  async refreshTokens(tokens: OauthTokensDto): Promise<OauthTokensDto> {
    const url = 'https://id.twitch.tv/oauth2/token';

    const { data } = await lastValueFrom(
      this.httpService.post<TwitchTokenResponseDto>(url, {
        grant_type: 'client_credentials',
        client_id: this.config.getClientId(),
        client_secret: this.config.getClientSecret(),
        refresh_token: tokens.refreshToken,
      }),
    );

    return OauthTokensDto.twitchOf(data);
  }
}
