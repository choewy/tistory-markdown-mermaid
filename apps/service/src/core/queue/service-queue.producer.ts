import { JobOptions, Queue } from 'bull';

import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';

import { EventQueue, RegistTemplateDonationQueue, UpdateBroadcastSettingQueue } from '@app/queue';

@Injectable()
export class ServiceQueueProducer {
  private readonly options: JobOptions = {
    attempts: 5,
    timeout: 10000,
    removeOnComplete: true,
    backoff: 0,
  };

  constructor(
    @InjectQueue(UpdateBroadcastSettingQueue.NAME)
    private readonly updateBroadcastSettingQueue: Queue,
    @InjectQueue(RegistTemplateDonationQueue.NAME)
    private readonly registTemplateDonationQueue: Queue,
  ) {}

  async updateBroadcastSetting(channelId: number): Promise<void> {
    await this.updateBroadcastSettingQueue.add(
      EventQueue.makeOf(UpdateBroadcastSettingQueue.EVENT, UpdateBroadcastSettingQueue.bodyOf(channelId)),
      this.options,
    );
  }

  async registTemplateDonation(channelId: number, donationId: number): Promise<void> {
    await this.registTemplateDonationQueue.add(
      EventQueue.makeOf(RegistTemplateDonationQueue.EVENT, RegistTemplateDonationQueue.bodyOf(channelId, donationId)),
      this.options,
    );
  }
}
