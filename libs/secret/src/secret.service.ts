import { existsSync, readFileSync } from 'fs';
import { Injectable } from '@nestjs/common';

import { NodeEnv } from '@app/conf';

import { SecretsManagerKey } from './enums';

@Injectable()
export class SecretLibService {
  private readonly NODE_ENV = process.env.NODE_ENV as NodeEnv.LOCAL;

  private async loadByJSON(prefix: string): Promise<Array<object>> {
    const loads = [];

    for (const key of [prefix].concat(Object.values(SecretsManagerKey))) {
      const path = `.env.${key}.json`;

      if (!existsSync(path)) {
        // get by secrets manager
        continue;
      }

      loads.push(JSON.parse(readFileSync(path, { encoding: 'utf-8' }).toString()));
    }

    return loads;
  }

  private async loadBySecretsManager(prefix: string): Promise<Array<object>> {
    const loads = [];

    console.log(prefix);

    return loads;
  }

  async override(prefix: string): Promise<void> {
    let loads: object[] = [];

    if (this.NODE_ENV === NodeEnv.LOCAL) {
      loads = await this.loadByJSON(prefix);
    } else {
      loads = await this.loadBySecretsManager(prefix);
    }

    for (const o of loads) {
      Object.entries(o).forEach(([k, v]) => {
        process.env[k] = v;
      });
    }
  }
}
