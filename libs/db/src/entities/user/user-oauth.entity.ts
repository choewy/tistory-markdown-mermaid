import { DateTime } from 'luxon';
import { BeforeInsert, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

import { NotNullColumn, UpdateDateTimeColumn } from '@app/db/decorators';

import { UserOauthPlatform } from './enums';
import { User } from './user.entity';

export class UserOauthRelations {
  @OneToOne(() => User, (e) => e.oauth, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: User;
}

@Entity()
export class UserOauth extends UserOauthRelations {
  @PrimaryColumn({
    type: 'bigint',
    unsigned: true,
    comment: 'User PK',
  })
  userId: number;

  @NotNullColumn({
    type: 'varchar',
    length: 100,
    comment: 'OAuth ID',
  })
  oauthId: string;

  @NotNullColumn({
    type: 'enum',
    enum: UserOauthPlatform,
    comment: 'OAuth Platform',
  })
  platform: UserOauthPlatform;

  @NotNullColumn({
    type: 'varchar',
    length: 500,
    comment: 'OAuth Access Token',
  })
  accessToken: string;

  @NotNullColumn({
    type: 'varchar',
    length: 500,
    comment: 'OAuth Access Token',
  })
  refreshToken: string;

  @UpdateDateTimeColumn({
    comment: '수정일시',
  })
  updatedAt: DateTime;

  @BeforeInsert()
  protected beforeInsert() {
    this.updatedAt = DateTime.local();
  }
}
