import { Expose } from 'class-transformer';

import { OauthTokensDto } from '@app/oauth';

export class AuthTokenRto {
  @Expose()
  accessToken: string;

  @Expose()
  refreshToken: string;

  public static of(token: OauthTokensDto) {
    const rto = new AuthTokenRto();

    rto.accessToken = token.accessToken;
    rto.refreshToken = token.refreshToken;

    return rto;
  }
}
