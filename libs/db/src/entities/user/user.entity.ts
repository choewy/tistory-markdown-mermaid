import Decimal from 'decimal.js';
import { DateTime } from 'luxon';
import { BeforeInsert, Entity, JoinTable, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import {
  CreateDateTimeColumn,
  NotNullBooleanColumn,
  NotNullColumn,
  NotNullDecimalColumn,
  NullableColumn,
  NullableDateTimeColumn,
  UpdateDateTimeColumn,
} from '@app/db/decorators';

import { UserOAuthPlatform, UserStatus, UserType } from './enums';
import { Following } from '../following';
import { Studio } from '../studio';

export class UserMapper {
  unsettledCash: number | null;
  isFollowing: any;
}

export class UserRelation extends UserMapper {
  @OneToOne(() => Studio, (e) => e.user, {
    nullable: true,
    cascade: true,
  })
  @JoinTable()
  studio: Studio | null;

  @OneToMany(() => Following, (e) => e.user, {
    cascade: true,
  })
  @JoinTable()
  following: Following[];

  @OneToMany(() => Following, (e) => e.followedUser)
  @JoinTable()
  followers: Following[];

  favoriteStickers: any[];
  favoriteCreatorStickerCategories: any[];
}

@Entity()
export class User extends UserRelation {
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

  @NotNullDecimalColumn({
    precision: 6,
    scale: 4,
    comment: '보유 캐시',
    default: 0,
  })
  fee: Decimal;

  @NotNullColumn({
    type: 'enum',
    enum: UserType,
    comment: '시청자/크리에이터 구분',
    default: UserType.VIEWER,
  })
  type: UserType;

  @NotNullBooleanColumn({
    comment: '칭호 사용 여부',
    default: true,
  })
  isAchievementActive: boolean;

  @NotNullBooleanColumn({
    comment: '직원 여부',
    default: false,
  })
  isStaff: boolean;

  @NotNullColumn({
    type: 'enum',
    enum: UserStatus,
    comment: '상태',
    default: UserStatus.ACTIVE,
  })
  status: UserStatus;

  @CreateDateTimeColumn({
    comment: '가입일시',
  })
  createdAt: DateTime;

  @UpdateDateTimeColumn({
    comment: '수정일시',
  })
  updatedAt: DateTime;

  @NullableDateTimeColumn({
    comment: '차단일시',
    default: null,
  })
  blockedAt: DateTime | null;

  @NullableDateTimeColumn({
    comment: '탈퇴일시',
    default: null,
  })
  withdrewAt: DateTime | null;

  @BeforeInsert()
  protected beforeInsert() {
    this.createdAt = DateTime.local();
    this.updatedAt = DateTime.local();
  }
}
