import { DateTime } from 'luxon';
import {
  BeforeInsert,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import {
  CreateDateTimeColumn,
  NotNullColumn,
  NullableColumn,
  NullableDateTimeColumn,
  UpdateDateTimeColumn,
} from 'submodule/stickybomb-kr-entity/src/decorators';

import { UserOauthPlatform, UserOauthStatus } from './enums';

import { User } from './user.entity';
import { UserImage } from './user-image.entity';

export class UserOauthRelations {
  @ManyToOne(() => User, (e) => e.oauths, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: User;

  @OneToOne(() => UserImage, (e) => e.oauth, {
    cascade: ['insert', 'update', 'remove'],
    lazy: true,
  })
  @JoinTable()
  image: Promise<UserImage> | UserImage;
}

@Entity()
export class UserOauth extends UserOauthRelations {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    unsigned: true,
    comment: 'PK',
  })
  readonly id: number;

  @NotNullColumn({
    type: 'bigint',
    unsigned: true,
    comment: 'User PK',
  })
  readonly userId: number;

  @Index()
  @NotNullColumn({
    type: 'varchar',
    length: 100,
    comment: 'Oauth ID',
  })
  oauthId: string;

  @NotNullColumn({
    type: 'varchar',
    length: 100,
    comment: '닉네임',
  })
  platform: UserOauthPlatform;

  @NotNullColumn({
    type: 'varchar',
    length: 100,
    comment: '닉네임',
  })
  nickname: string;

  @NullableColumn({
    type: 'varchar',
    length: 400,
    default: null,
    comment: '이메일',
  })
  email: string | null;

  @NotNullColumn({
    type: 'varchar',
    length: 512,
    comment: 'Oauth Access Token',
  })
  accessToken: string;

  @NotNullColumn({
    type: 'varchar',
    length: 512,
    comment: 'Oauth Refresh Token',
  })
  refreshToken: string;

  @NotNullColumn({
    type: 'enum',
    enum: UserOauthStatus,
    comment: '상태',
    default: UserOauthStatus.LINKED,
  })
  status: UserOauthStatus;

  @CreateDateTimeColumn({
    comment: '연동일시',
  })
  createdAt: DateTime;

  @UpdateDateTimeColumn({
    comment: '수정일시',
  })
  updatedAt: DateTime;

  @NullableDateTimeColumn({
    comment: '연동일시',
    default: null,
  })
  unlinkedAt: DateTime | null;

  @BeforeInsert()
  protected beforeInsert() {
    this.createdAt = DateTime.local();
    this.updatedAt = DateTime.local();
  }
}
