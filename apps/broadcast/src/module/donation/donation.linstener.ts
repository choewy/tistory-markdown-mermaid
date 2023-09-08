import { Job } from 'bull';

import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { RegistTemplateDonationQueue } from '@app/queue';
import { UserRepository } from '@app/db';

@Injectable()
export class DonationListener {
  private readonly logger = new Logger(DonationListener.name);

  constructor(private readonly userRepository: UserRepository) {}

  async onApplicationBootstrap() {
    this.userRepository.find().then(console.log);
  }

  @OnEvent(RegistTemplateDonationQueue.EVENT)
  async onRegistTemplateDonation(job: Job<RegistTemplateDonationQueue>) {
    this.logger.verbose(JSON.stringify(job.data, null, 2));

    try {
      return;
    } catch (e) {
      return e;
    }
  }
}
