import { Injectable } from '@nestjs/common';

@Injectable()
export class GoogleConfig {
  private readonly CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
  private readonly CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
  private readonly API_KEY = process.env.GOOGLE_API_KEY;
  private readonly REFERER = process.env.GOOGLE_API_REFERER;

  public getClientId(): string {
    return this.CLIENT_ID;
  }

  public getClientSecret(): string {
    return this.CLIENT_SECRET;
  }

  public getApiKey(): string {
    return this.API_KEY;
  }

  public getReferer(): string {
    return this.REFERER;
  }
}
