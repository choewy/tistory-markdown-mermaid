import { OauthGetTokenParamsDto, OauthProfileDto, OauthTokensDto } from './dtos';

export interface OauthServiceImpl {
  getProfile(accessToken: string): Promise<OauthProfileDto>;
  getTokens(params: OauthGetTokenParamsDto): Promise<OauthTokensDto>;
  refreshTokens(tokens: OauthTokensDto): Promise<OauthTokensDto>;
}
