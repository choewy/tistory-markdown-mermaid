import { existsSync, readFileSync, writeFileSync } from 'fs';

import { Injectable } from '@nestjs/common';

import { GetSecretValueCommand, SecretsManagerClient } from '@aws-sdk/client-secrets-manager';

import { AwsConfig, NodeEnv } from '@app/conf';

import { SecretsManagerKey, SecretsManagerPrefix } from './enums';

@Injectable()
export class SecretLibService {
  private readonly NODE_ENV = process.env.NODE_ENV as NodeEnv.LOCAL;

  private readonly client: SecretsManagerClient;

  constructor(private readonly awsConfig: AwsConfig) {
    this.client = this.awsConfig.getSecetsManagerClient();
  }

  private override(o: object): void {
    for (const [k, v] of Object.entries(o)) {
      process.env[k] = v;
    }
  }

  async loads(prefix: SecretsManagerPrefix): Promise<void> {
    process.env.APP = prefix;

    const isLocal = this.NODE_ENV === NodeEnv.LOCAL;
    const keys = ([prefix] as Array<SecretsManagerPrefix | SecretsManagerKey>).concat(Object.values(SecretsManagerKey));

    for (const key of keys) {
      const path = this.awsConfig.getSecrestManagerFilePath(key);
      const secretId = this.awsConfig.getSecretsManagerSecretId(key);

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
