import { Entity, PrimaryGeneratedColumn } from 'typeorm';

import { NotNullColumn, NullableColumn } from '@app/db/decorators';

import { UserOAuthPlatform } from './enums';

@Entity()
export class User {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    unsigned: true,
  })
  readonly id: number;

  @NotNullColumn({
    type: 'enum',
    enum: UserOAuthPlatform,
    comment: 'OAuth Platform',
  })
  oauthPlatform: UserOAuthPlatform;

  @NotNullColumn({
    type: 'varchar',
    length: 100,
    comment: 'OAuth ID',
  })
  oauthId: string;

  @NotNullColumn({
    type: 'varchar',
    length: 500,
    comment: 'OAuth Access Token',
  })
  oauthAccessToken: string;

  @NotNullColumn({
    type: 'varchar',
    length: 500,
    comment: 'OAuth Access Token',
  })
  oauthRefreshToken: string;

  @NotNullColumn({
    type: 'varchar',
    length: 100,
    comment: '닉네임',
  })
  nickname: string;

  @NullableColumn({
    type: 'varchar',
    length: 400,
    comment: '이메일',
  })
  email: string | null;

  @NullableColumn({
    type: 'varchar',
    length: 512,
    comment: '이미지 경로',
  })
  imagePath: string | null;

  @NotNullColumn({
    type: 'int',
    unsigned: true,
    comment: '보유 캐시',
    default: 0,
  })
  cash: number;
}
