import { Injectable, Type } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DateTime } from 'luxon';
import { LogLevel } from 'typeorm';

import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { TypeOrmTypeCastField } from './interfaces';

@Injectable()
export class DbConfig {
  private readonly HOST = process.env.DB_HOST;
  private readonly PORT = process.env.DB_PORT;
  private readonly USERNAME = process.env.DB_USERNAME;
  private readonly PASSWORD = process.env.DB_PASSWORD;
  private readonly DATABASE = process.env.DB_DATABASE;
  private readonly SYNCHRONIZE = process.env.DB_SYNCHRONIZE;
  private readonly TIMEZONE = process.env.DB_TIMEZONE;
  private readonly LOGGING = process.env.DB_LOGGING;

  public getOptions(entities: Type<any>[]): TypeOrmModuleOptions {
    return {
      entities,
      type: 'mysql',
      host: this.HOST,
      port: Number(this.PORT),
      username: this.USERNAME,
      password: this.PASSWORD,
      database: this.DATABASE,
      timezone: this.TIMEZONE,
      synchronize: this.SYNCHRONIZE === 'true',
      logging: ['true', 'false'].includes(this.LOGGING)
        ? this.LOGGING === 'true'
        : (this.LOGGING.split('|') as LogLevel[]),
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
