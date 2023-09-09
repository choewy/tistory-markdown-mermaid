import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import {
  AppConfig,
  AwsConfig,
  CorsConfig,
  DbConfig,
  GoogleConfig,
  KakaoConfig,
  NaverConfig,
  RedisConfig,
  TwitchConfig,
} from './configs';

const configs = [
  AwsConfig,
  AppConfig,
  CorsConfig,
  DbConfig,
  RedisConfig,
  TwitchConfig,
  GoogleConfig,
  KakaoConfig,
  NaverConfig,
];

@Module({
  imports: [ConfigModule.forRoot()],
  providers: configs,
  exports: configs,
})
export class ConfLibModule {}
export const ConfLibModuleRef = forwardRef(() => ConfLibModule);
