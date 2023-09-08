import { Module, forwardRef } from '@nestjs/common';

import { ServiceQueueProducer } from './service-queue.producer';
import { QueueLibModule, QueuePrefix, RegistTemplateDonationQueue, UpdateBroadcastSettingQueue } from '@app/queue';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    QueueLibModule,
    BullModule.registerQueue(
      {
        prefix: QueuePrefix.BROADCAST,
        name: UpdateBroadcastSettingQueue.NAME,
      },
      {
        prefix: QueuePrefix.BROADCAST,
        name: RegistTemplateDonationQueue.NAME,
      },
    ),
  ],
  providers: [ServiceQueueProducer],
  exports: [ServiceQueueProducer],
})
export class ServiceQueueModule {}
export const ServiceQueueModuleRef = forwardRef(() => ServiceQueueModule);
