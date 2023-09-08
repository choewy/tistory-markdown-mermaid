import { Module } from '@nestjs/common';
import { BroadcastSettingListener } from './broadcast-setting.listener';

@Module({
  providers: [BroadcastSettingListener],
})
export class BroadcastSettingModule {}
