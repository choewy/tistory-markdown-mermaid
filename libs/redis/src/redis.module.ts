import { Module } from '@nestjs/common';

import { ConfLibModuleRef } from '@app/conf';

import { RedisLibService } from './redis.service';

@Module({
  imports: [ConfLibModuleRef],
  providers: [RedisLibService],
  exports: [RedisLibService],
})
export class RedisLibModule {}
