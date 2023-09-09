import { Module, forwardRef } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { ConfLibModuleRef } from '@app/conf';

import { OauthService } from './oauth.service';

import { TwitchOauthService } from './twitch';
import { GoogleOauthService } from './google';
import { KakaoOauthService } from './kakao';
import { NaverOauthService } from './naver';

@Module({
  imports: [ConfLibModuleRef, forwardRef(() => HttpModule)],
  providers: [TwitchOauthService, GoogleOauthService, KakaoOauthService, NaverOauthService, OauthService],
  exports: [TwitchOauthService, GoogleOauthService, KakaoOauthService, NaverOauthService, OauthService],
})
export class OauthModule {}
export const OauthModuleRef = forwardRef(() => OauthModule);
