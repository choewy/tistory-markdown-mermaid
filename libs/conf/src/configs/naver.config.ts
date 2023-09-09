import { Injectable } from '@nestjs/common';

@Injectable()
export class NaverConfig {
  private readonly CLIENT_ID = process.env.NAVER_CLIENT_ID;
  private readonly CLIENT_SECRET = process.env.NAVER_CLIENT_SECRET;

  public getClientId(): string {
    return this.CLIENT_ID;
  }

  public getClientSecret(): string {
    return this.CLIENT_SECRET;
  }
}
