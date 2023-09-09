import { OauthService } from '@app/oauth';
import { Body, Controller, Param, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthOauthGetTokenBodyDto, AuthOauthGetUrlBodyDto, AuthOauthParamsDto } from './dtos';
import { AuthTokenRto } from './rtos';

@Controller('auth')
export class AuthController {
  constructor(private readonly oauthService: OauthService, private readonly authService: AuthService) {}

  @Post(':platform/url')
  async getOauthUrl(@Param() param: AuthOauthParamsDto, @Body() body: AuthOauthGetUrlBodyDto): Promise<string> {
    return this.oauthService.getUrl(param.platform, body.redirectUri);
  }

  @Post(':platform/tokens')
  async getTokens(@Param() param: AuthOauthParamsDto, @Body() body: AuthOauthGetTokenBodyDto): Promise<AuthTokenRto> {
    return AuthTokenRto.of(await this.oauthService.getTokens(param.platform, body));
  }

  @Post('signin')
  async signIn() {
    return;
  }

  @Post('signup')
  async signUp() {
    return;
  }
}
