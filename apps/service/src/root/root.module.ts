import { Module } from '@nestjs/common';

import { ConfLibModule } from '@app/conf';
import { DbLibModule } from '@app/db';
import { RedisLibModule } from '@app/redis';

import { CoreModule } from '@service/core';

@Module({
  imports: [ConfLibModule, DbLibModule, RedisLibModule, CoreModule],
})
export class RootModule {}
