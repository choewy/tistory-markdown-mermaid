import { Module, forwardRef } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';

import { QueueLibModule, QueuePrefix, RegistTemplateDonationQueue, UpdateBroadcastSettingQueue } from '@app/queue';

import { UpdateBroadcastSettingQueueConsumer, RegistTemplateDonationQueueConsumer } from './broadcast-queue.consumer';

@Module({
  imports: [
    QueueLibModule,
    BullModule.registerQueue(
      {
        prefix: QueuePrefix.BROADCAST,
        name: RegistTemplateDonationQueue.NAME,
      },
      {
        prefix: QueuePrefix.BROADCAST,
        name: UpdateBroadcastSettingQueue.NAME,
      },
    ),
  ],
  providers: [UpdateBroadcastSettingQueueConsumer, RegistTemplateDonationQueueConsumer],
})
export class BroadcastQueueModule {}
export const BroadcastQueueModuleRef = forwardRef(() => BroadcastQueueModule);
