import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

import { UserOauthPlatform } from '@app/db';

export class AuthOauthParamsDto {
  @IsNotEmpty()
  @IsEnum(UserOauthPlatform)
  platform: UserOauthPlatform;
}

export class AuthOauthGetUrlBodyDto {
  @IsNotEmpty()
  @IsString()
  redirectUri: string;
}

export class AuthOauthGetTokenBodyDto {
  @IsNotEmpty()
  @IsString()
  code: string;

  @IsOptional()
  @IsString()
  redirectUri?: string;

  @IsOptional()
  @IsNumber()
  state?: number;
}
