import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class DbConfig {
  private readonly HOST = process.env.DB_HOST;
  private readonly PORT = process.env.DB_PORT;
  private readonly USERNAME = process.env.DB_USERNAME;
  private readonly PASSWORD = process.env.DB_PASSWORD;
  private readonly DATABASE = process.env.DB_DATABASE;

  public getOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.HOST,
      port: Number(this.PORT),
      username: this.USERNAME,
      password: this.PASSWORD,
      database: this.DATABASE,
    };
  }
}
