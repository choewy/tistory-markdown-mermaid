import { Module } from '@nestjs/common';

import { BroadcastQueueModule } from './queue';

@Module({
  imports: [BroadcastQueueModule],
})
export class CoreModule {}
