import { json, urlencoded } from 'express';

import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { SecretLibModule, SecretLibService, SecretsManagerPrefix } from '@app/secret';
import { AppConfig } from '@app/conf';

import { RootModule } from '@broadcast/root';

export class Bootstrap {
  public static async define() {
    const secretManager = await NestFactory.createApplicationContext(SecretLibModule);
    await secretManager.get(SecretLibService).loads(SecretsManagerPrefix.BROADCAST);

    return new Bootstrap(await NestFactory.create(RootModule, {}));
  }

  constructor(private readonly app: INestApplication) {
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
  }

  async listen(): Promise<void> {
    const { port, host } = this.app.get(AppConfig).getListenOptions();

    await this.app.listen(port, host);
  }
}
