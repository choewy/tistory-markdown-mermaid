import { Injectable } from '@nestjs/common';

import { SecretsManagerClient, SecretsManagerClientConfig } from '@aws-sdk/client-secrets-manager';

import { NodeEnv } from './enums';

@Injectable()
export class AwsConfig {
  private readonly NODE_ENV = process.env.NODE_ENV as NodeEnv.LOCAL;

  private readonly AWS_REGION = process.env.AWS_REGION;
  private readonly AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
  private readonly AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;

  public getSecrestManagerFilePath(key: string): string {
    return ['.env', key, 'json'].join('.');
  }

  public getSecretsManagerSecretId(key: string): string {
    return [this.NODE_ENV, key].join('/');
  }

  public getSecetsManagerClient(): SecretsManagerClient {
    const config: SecretsManagerClientConfig = { region: this.AWS_REGION };

    if (this.NODE_ENV === NodeEnv.LOCAL) {
      config.credentials = {
        accessKeyId: this.AWS_ACCESS_KEY,
        secretAccessKey: this.AWS_SECRET_ACCESS_KEY,
      };
    }

    return new SecretsManagerClient(config);
  }
}
