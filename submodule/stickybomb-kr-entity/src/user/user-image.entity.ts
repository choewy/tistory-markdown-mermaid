import { DateTime } from 'luxon';
import { BeforeInsert, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { NullableColumn } from '@entity/decorators';
import { ImageFileEntity } from '@entity/base';

import { UserProfile } from './user-profile.entity';
import { UserOauth } from './user-oauth.entity';

export class UserImageRelations extends ImageFileEntity {
  @OneToOne(() => UserProfile, (e) => e.image, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn()
  profile: UserProfile | null;

  @OneToOne(() => UserOauth, (e) => e.image, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn()
  oauth: UserOauth | null;
}

@Entity()
export class UserImage extends UserImageRelations {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    unsigned: true,
    comment: 'PK',
  })
  readonly id: number;

  @NullableColumn({
    type: 'bigint',
    unsigned: true,
    comment: 'User Profile PK',
    default: null,
  })
  readonly profileId: number | null;

  @NullableColumn({
    type: 'bigint',
    unsigned: true,
    comment: 'User Oauth PK',
    default: null,
  })
  readonly oauthId: number | null;

  @BeforeInsert()
  protected beforeInsert() {
    this.createdAt = DateTime.local();
    this.updatedAt = DateTime.local();
  }
}
