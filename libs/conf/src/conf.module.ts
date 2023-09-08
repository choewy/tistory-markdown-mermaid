import { Module, forwardRef } from '@nestjs/common';

import { AppConfig, AwsConfig, CorsConfig, DbConfig, RedisConfig } from './configs';
import { ConfigModule } from '@nestjs/config';

const configs = [AwsConfig, AppConfig, CorsConfig, DbConfig, RedisConfig];

@Module({
  imports: [ConfigModule.forRoot()],
  providers: configs,
  exports: configs,
})
export class ConfLibModule {}
export const ConfLibModuleRef = forwardRef(() => ConfLibModule);
