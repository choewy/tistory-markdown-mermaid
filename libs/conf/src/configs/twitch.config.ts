import { Injectable } from '@nestjs/common';

@Injectable()
export class TwitchConfig {
  private readonly CLIENT_ID = process.env.TWITCH_CLIENT_ID;
  private readonly CLIENT_SECRET = process.env.TWITCH_CLIENT_SECRET;

  public getClientId(): string {
    return this.CLIENT_ID;
  }

  public getClientSecret(): string {
    return this.CLIENT_SECRET;
  }
}
