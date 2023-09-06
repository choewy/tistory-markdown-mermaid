import { Injectable } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

@Injectable()
export class CorsConfig {
  private readonly WS_ORIGIN = process.env.CORS_WS_ORIGIN;

  private readonly ORIGIN = process.env.CORS_HTTP_ORIGIN;
  private readonly METHOD = process.env.CORS_HTTP_METHOD;
  private readonly ALLOWED_HEADERS = process.env.CORS_HTTP_ALLOWED_HEADERS;
  private readonly EXPOSED_HEADERS = process.env.CORS_HTTP_EXPOSED_HEADERS;
  private readonly CREDENTIALS = process.env.CORS_HTTP_CREDENTIALS;

  public getWsOrigin(): RegExp {
    return new RegExp(this.WS_ORIGIN);
  }

  public getHttpOptions(): CorsOptions {
    return {
      origin: new RegExp(this.ORIGIN),
      methods: (this.METHOD || '').split('|'),
      allowedHeaders: (this.ALLOWED_HEADERS || '').split('|'),
      exposedHeaders: (this.EXPOSED_HEADERS || '').split('|'),
      credentials: this.CREDENTIALS === 'true',
    };
  }
}
