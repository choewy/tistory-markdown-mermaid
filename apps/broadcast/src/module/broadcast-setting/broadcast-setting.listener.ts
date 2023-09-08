import { UpdateBroadcastSettingQueue } from '@app/queue';
import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Job } from 'bull';

@Injectable()
export class BroadcastSettingListener {
  private readonly logger = new Logger(BroadcastSettingListener.name);

  @OnEvent(UpdateBroadcastSettingQueue.EVENT)
  async onUpdateBroadcastSetting(job: Job<UpdateBroadcastSettingQueue>) {
    this.logger.verbose(JSON.stringify(job.data, null, 2));

    try {
      return;
    } catch (e) {
      return e;
    }
  }
}
