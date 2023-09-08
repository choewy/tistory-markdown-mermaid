import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { ConfLibModule } from '@app/conf';
import { DbLibModule } from '@app/db';
import { RedisLibModule } from '@app/redis';

import { CoreModule } from '@broadcast/core';
import { BroadcastSettingModule, DonationModule } from '@broadcast/module';

@Module({
  imports: [
    EventEmitterModule.forRoot({
      global: true,
    }),
    ConfLibModule,
    DbLibModule,
    RedisLibModule,
    CoreModule,
    BroadcastSettingModule,
    DonationModule,
  ],
})
export class RootModule {}
