import { Module } from '@nestjs/common';

import { ConfLibModule } from '@app/conf';
import { DbLibModule } from '@app/db';
import { RedisLibModule } from '@app/redis';

import { CoreModule } from '@service/core';
import { AuthModule } from '@service/module';

@Module({
  imports: [ConfLibModule, DbLibModule, RedisLibModule, CoreModule, AuthModule],
})
export class RootModule {}
