import { DateTime } from 'luxon';
import { BeforeInsert, Entity, JoinColumn, JoinTable, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { NotNullColumn, NullableColumn, UpdateDateTimeColumn } from 'submodule/stickybomb-kr-entity/src/decorators';

import { User } from './user.entity';
import { UserImage } from './user-image.entity';

export class UserProfileRelations {
  @OneToOne(() => User, (e) => e.profile, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: User;

  @OneToOne(() => UserImage, (e) => e.profile, {
    cascade: ['insert', 'update', 'remove'],
    nullable: true,
    lazy: true,
  })
  @JoinTable()
  image: Promise<UserImage | null> | UserImage | null;
}

@Entity()
export class UserProfile extends UserProfileRelations {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    unsigned: true,
    comment: 'User PK',
  })
  readonly id: number;

  @NotNullColumn({
    type: 'bigint',
    unsigned: true,
    comment: 'User PK',
  })
  readonly userId: number;

  @NullableColumn({
    type: 'varchar',
    length: 100,
    default: null,
    comment: '닉네임',
  })
  nickname: string;

  @UpdateDateTimeColumn({
    comment: '수정일시',
  })
  updatedAt: DateTime;

  @BeforeInsert()
  protected beforeInsert() {
    this.updatedAt = DateTime.local();
  }
}
