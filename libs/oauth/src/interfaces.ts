import { OauthGetTokenParamsDto, OauthProfileDto, OauthTokensDto } from './dtos';

export interface OauthServiceImpl {
  getUrl(redirect_uri: string): string;
  getProfile(accessToken: string): Promise<OauthProfileDto>;
  getTokens(params: OauthGetTokenParamsDto): Promise<OauthTokensDto>;
  refreshTokens(tokens: OauthTokensDto): Promise<OauthTokensDto>;
}
