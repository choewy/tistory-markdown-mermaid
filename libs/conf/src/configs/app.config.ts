import { ListenOptions } from 'net';
import { Injectable } from '@nestjs/common';

import { NodeEnv } from './enums';

@Injectable()
export class AppConfig {
  private readonly NODE_ENV = process.env.NODE_ENV as NodeEnv;
  private readonly TZ = process.env.TZ;
  private readonly NAME = process.env.APP_NAME;
  private readonly HOST = process.env.APP_HOST;
  private readonly PORT = process.env.APP_PORT;
  private readonly PROTOCOL = process.env.APP_PROTOCOL;
  private readonly URI = process.env.APP_URI;

  public getTimezone(): string {
    return this.TZ;
  }

  public getName(): string {
    return this.NAME;
  }

  public getNodeEnv(): NodeEnv {
    return this.NODE_ENV;
  }

  public getListenOptions(): ListenOptions {
    return { host: this.HOST, port: Number(this.PORT) };
  }

  public getUrl(): string {
    return [this.PROTOCOL, this.URI].join('://');
  }
}
