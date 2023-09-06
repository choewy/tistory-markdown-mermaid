import { existsSync, readFileSync } from 'fs';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';

import { ConfKey } from './enums';
import { NodeEnv } from './configs';

@Injectable()
export class ConfService implements OnApplicationBootstrap {
  private readonly APP = process.env.APP as string;
  private readonly NODE_ENV = process.env.NODE_ENV as NodeEnv.LOCAL;

  async onApplicationBootstrap(): Promise<void> {
    let loads = [];

    if (this.NODE_ENV === NodeEnv.LOCAL) {
      loads = await this.loadByJSON();
    } else {
      loads = await this.loadBySecretsManager();
    }

    this.override(loads);
  }

  private override(objects: object[]): void {
    for (const o of objects) {
      Object.entries(o).forEach(([k, v]) => {
        process.env[k] = v;
      });
    }
  }

  private async loadByJSON(): Promise<Array<object>> {
    const loads = [];

    for (const key of [this.APP].concat(Object.values(ConfKey))) {
      const path = `.env.${key}.json`;

      if (!existsSync(path)) {
        // save json
        continue;
      }

      loads.push(JSON.parse(readFileSync(path, { encoding: 'utf-8' }).toString()));
    }

    return loads;
  }

  private async loadBySecretsManager(): Promise<Array<object>> {
    const loads = [];

    return loads;
  }
}
