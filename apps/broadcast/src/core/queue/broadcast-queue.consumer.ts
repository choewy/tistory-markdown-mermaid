import { Job } from 'bull';

import { Process, Processor } from '@nestjs/bull';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { EventQueue, RegistTemplateDonationQueue, UpdateBroadcastSettingQueue } from '@app/queue';

@Processor(UpdateBroadcastSettingQueue.NAME)
export class UpdateBroadcastSettingQueueConsumer {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  @Process()
  async consume(job: Job<EventQueue>): Promise<void> {
    const [res] = await this.eventEmitter.emitAsync(job.data.event, job);

    if (typeof res === 'boolean' && res === true) {
      await job.moveToCompleted();

      return;
    }

    if (res instanceof Error) {
      await job.moveToFailed({ message: res.message });

      return;
    }
  }
}

@Processor(RegistTemplateDonationQueue.NAME)
export class RegistTemplateDonationQueueConsumer {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  @Process()
  async consume(job: Job<EventQueue>): Promise<void> {
    const [res] = await this.eventEmitter.emitAsync(job.data.event, job);

    if (typeof res === 'boolean' && res === true) {
      await job.moveToCompleted();

      return;
    }

    if (res instanceof Error) {
      await job.moveToFailed({ message: res.message }, true);

      return;
    }
  }
}
