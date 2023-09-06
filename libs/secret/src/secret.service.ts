import { existsSync, readFileSync, writeFileSync } from 'fs';
import { Injectable } from '@nestjs/common';
import {
  GetSecretValueCommand,
  SecretsManagerClient,
  SecretsManagerClientConfig,
} from '@aws-sdk/client-secrets-manager';

import { NodeEnv } from '@app/conf';

import { SecretsManagerKey, SecretsManagerPrefix } from './enums';

@Injectable()
export class SecretLibService {
  private readonly NODE_ENV = process.env.NODE_ENV as NodeEnv.LOCAL;

  private readonly AWS_REGION = process.env.AWS_REGION;
  private readonly AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
  private readonly AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;

  private readonly client: SecretsManagerClient;

  constructor() {
    const config: SecretsManagerClientConfig = { region: this.AWS_REGION };

    if (this.NODE_ENV === NodeEnv.LOCAL) {
      config.credentials = {
        accessKeyId: this.AWS_ACCESS_KEY,
        secretAccessKey: this.AWS_SECRET_ACCESS_KEY,
      };
    }

    this.client = new SecretsManagerClient(config);
  }

  private override(o: object): void {
    for (const [k, v] of Object.entries(o)) {
      process.env[k] = v;
    }
  }

  async loads(prefix: SecretsManagerPrefix): Promise<void> {
    const isLocal = this.NODE_ENV === NodeEnv.LOCAL;
    const keys = ([prefix] as Array<SecretsManagerPrefix | SecretsManagerKey>).concat(Object.values(SecretsManagerKey));

    for (const key of keys) {
      const path = ['.env', key, 'json'].join('.');
      const secretId = [this.NODE_ENV, key].join('/');

      if (isLocal && existsSync(path)) {
        this.override(JSON.parse(readFileSync(path, { encoding: 'utf-8' }).toString()));

        continue;
      }

      const command = new GetSecretValueCommand({ SecretId: secretId });
      const secrets = await this.client.send(command).then((res) => JSON.parse(res.SecretString));

      if (isLocal) {
        writeFileSync(path, JSON.stringify(secrets, null, 2), { encoding: 'utf-8' });
      }

      this.override(secrets);
    }
  }
}
