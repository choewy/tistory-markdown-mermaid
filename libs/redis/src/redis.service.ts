import IoRedis from 'ioredis';
import Redlock, { Lock, Settings } from 'redlock';

import { Injectable } from '@nestjs/common';

import { RedisConfig } from '@app/conf';

@Injectable()
export class RedisLibService extends IoRedis {
  private readonly redlock: Redlock;

  constructor(redisConfig: RedisConfig) {
    super(redisConfig.getConnectOptions());

    this.redlock = new Redlock([this]);
  }

  async lock(key: string, duration = 500, options?: Partial<Settings>): Promise<Lock> {
    return this.redlock.acquire([[key, 'redlock'].join('-')], duration, options);
  }
}
