import { Injectable } from '@nestjs/common';
import { BullModuleOptions } from '@nestjs/bull';

import { RedisOptions } from 'ioredis';

@Injectable()
export class RedisConfig {
  private readonly HOST = process.env.REDIS_HOST;
  private readonly PORT = process.env.REDIS_PORT;
  private readonly USERNAME = process.env.REDIS_USERNAME;
  private readonly PASSWORD = process.env.REDIS_PASSWORD;
  private readonly DB = process.env.REDIS_DB;

  public getConnectOptions(): RedisOptions {
    return {
      host: this.HOST,
      port: Number(this.PORT),
      username: this.USERNAME,
      password: this.PASSWORD,
      db: Number(this.DB),
    };
  }

  public getBullOptions(): BullModuleOptions {
    return {
      redis: {
        host: this.HOST,
        port: Number(this.PORT),
        db: Number(this.DB),
      },
    };
  }
}
