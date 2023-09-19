import { DateTime } from 'luxon';
import { BeforeInsert, Entity, JoinTable, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { CreateDateTimeColumn, NotNullColumn, NullableDateTimeColumn, UpdateDateTimeColumn } from '@entity/decorators';
import { Studio, StudioBan } from '@entity/studio';

import { UserProfileType, UserStatus, UserType } from './enums';

import { UserOauth } from './user-oauth.entity';
import { UserWallet } from './user-wallet.entity';
import { UserSetting } from './user-setting.entity';
import { UserProfile } from './user-profile.entity';
import { UserFollow } from './user-follow.entity';

export class UserRelations {
  @OneToMany(() => UserOauth, (e) => e.user, {
    cascade: ['insert', 'update', 'remove'],
    lazy: true,
  })
  @JoinTable()
  oauths: Promise<UserOauth[]> | UserOauth[];

  @OneToOne(() => UserWallet, (e) => e.user, {
    cascade: ['insert', 'update', 'remove'],
    lazy: true,
  })
  @JoinTable()
  wallet: Promise<UserWallet> | UserWallet;

  @OneToOne(() => UserProfile, (e) => e.user, {
    cascade: ['insert', 'update', 'remove'],
    lazy: true,
  })
  @JoinTable()
  profile: Promise<UserProfile> | UserProfile;

  @OneToOne(() => UserSetting, (e) => e.user, {
    cascade: ['insert', 'update', 'remove'],
    lazy: true,
  })
  @JoinTable()
  setting: Promise<UserSetting> | UserSetting;

  @OneToMany(() => UserFollow, (e) => e.following, {
    cascade: ['insert', 'remove'],
    lazy: true,
  })
  @JoinTable()
  followings: Promise<UserFollow[]> | UserFollow[];

  @OneToMany(() => UserFollow, (e) => e.follower, {
    cascade: ['insert', 'remove'],
    lazy: true,
  })
  @JoinTable()
  followers: Promise<UserFollow[]> | UserFollow[];

  @OneToOne(() => Studio, (e) => e.user, {
    cascade: ['insert', 'update', 'remove'],
    nullable: true,
    lazy: true,
  })
  @JoinTable()
  studio: Promise<Studio | null> | Studio | null;

  @OneToMany(() => StudioBan, (e) => e.user, {
    cascade: ['remove'],
    lazy: true,
  })
  @JoinTable()
  bans: Promise<StudioBan[]> | StudioBan[];
}

@Entity()
export class User extends UserRelations {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    unsigned: true,
    comment: 'PK',
  })
  readonly id: number;

  @NotNullColumn({
    type: 'enum',
    enum: UserType,
    comment: '사용자 유형',
  })
  userType: UserType;

  @NotNullColumn({
    type: 'enum',
    enum: UserProfileType,
    default: UserProfileType.OAUTH,
    comment: '프로필 유형',
  })
  profileType: UserProfileType;

  @NotNullColumn({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.ACTIVE,
    comment: '상태',
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
    default: null,
    comment: '차단일시',
  })
  blockedAt: DateTime | null;

  @NullableDateTimeColumn({
    default: null,
    comment: '탈퇴일시',
  })
  withdrewAt: DateTime | null;

  @BeforeInsert()
  protected beforeInsert() {
    this.createdAt = DateTime.local();
    this.updatedAt = DateTime.local();
  }
}
