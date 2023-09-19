import { readFileSync } from 'fs';
import { DateTime } from 'luxon';
import { DataSourceOptions, LogLevel } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { TypeOrmTypeCastField } from './interfaces';
import { entities } from './entities';

export class EzbarKREntityConfig {
  private readonly TYPE: any;
  private readonly HOST: string;
  private readonly PORT: string;
  private readonly USERNAME: string;
  private readonly PASSWORD: string;
  private readonly DATABASE: string;
  private readonly SYNCHRONIZE: string;
  private readonly TIMEZONE: string;
  private readonly LOGGING: string;
  private readonly DROP_SCHEMA: string;
  private readonly TLS: string;
  private readonly CA: string;

  constructor(private readonly prefix: string) {
    this.TYPE = process.env[[this.prefix, 'TYPE'].join('_')];
    this.HOST = process.env[[this.prefix, 'HOST'].join('_')];
    this.PORT = process.env[[this.prefix, 'PORT'].join('_')];
    this.USERNAME = process.env[[this.prefix, 'USERNAME'].join('_')];
    this.PASSWORD = process.env[[this.prefix, 'PASSWORD'].join('_')];
    this.DATABASE = process.env[[this.prefix, 'DATABASE'].join('_')];
    this.SYNCHRONIZE = process.env[[this.prefix, 'SYNCHRONIZE'].join('_')];
    this.TIMEZONE = process.env[[this.prefix, 'TIMEZONE'].join('_')];
    this.LOGGING = process.env[[this.prefix, 'LOGGING'].join('_')];
    this.DROP_SCHEMA = process.env[[this.prefix, 'DROP_SCHEMA'].join('_')];
    this.TLS = process.env[[this.prefix, 'TLS'].join('_')];
    this.CA = process.env[[this.prefix, 'CA'].join('_')];
  }

  public static of(prefix: string) {
    return new EzbarKREntityConfig(prefix);
  }

  public getOptions(): TypeOrmModuleOptions | DataSourceOptions {
    return {
      entities,
      type: this.TYPE,
      host: this.HOST,
      port: Number(this.PORT),
      username: this.USERNAME,
      password: this.PASSWORD,
      database: this.DATABASE,
      timezone: this.TIMEZONE,
      synchronize: this.SYNCHRONIZE === 'true',
      dropSchema: this.DROP_SCHEMA === 'true',
      logging: ['true', 'false'].includes(this.LOGGING)
        ? this.LOGGING === 'true'
        : (this.LOGGING.split('|') as LogLevel[]),
      ssl:
        this.TLS === 'true'
          ? {
              rejectUnauthorized: true,
              ca: this.CA ? readFileSync(this.CA).toString() : undefined,
            }
          : undefined,
      autoLoadEntities: true,
      namingStrategy: new SnakeNamingStrategy(),
      extra: {
        typeCast: (field: TypeOrmTypeCastField, next: () => void) => {
          let val: string;

          switch (field.type) {
            case 'LONG':
            case 'LONGLONG':
              val = field.string();

              return val === null ? null : Number(val);

            case 'DATE':
              val = field.string();

              return val === null ? null : DateTime.fromFormat(val, 'yyyy-MM-dd');

            case 'DATETIME':
            case 'TIMESTAMP':
              val = field.string();
              return val === null ? null : DateTime.fromFormat(val, 'yyyy-MM-dd HH:mm:ss');

            default:
              return next();
          }
        },
      },
    };
  }
}
