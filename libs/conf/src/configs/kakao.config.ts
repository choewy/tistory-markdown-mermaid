import { Injectable } from '@nestjs/common';

@Injectable()
export class KakaoConfig {
  private readonly CLIENT_ID = process.env.KAKAO_CLIENT_ID;
  private readonly CLIENT_SECRET = process.env.KAKAO_CLIENT_SECRET;

  public getClientId(): string {
    return this.CLIENT_ID;
  }

  public getClientSecret(): string {
    return this.CLIENT_SECRET;
  }
}
