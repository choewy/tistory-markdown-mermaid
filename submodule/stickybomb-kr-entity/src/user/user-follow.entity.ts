import { DateTime } from 'luxon';
import { BeforeInsert, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { CreateDateTimeColumn } from '@entity/decorators';
import { User } from '@entity/user';

export class UserFollowRelations {
  @ManyToOne(() => User, (e) => e.followings, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  follower: User;

  @ManyToOne(() => User, (e) => e.followers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  following: User;
}

@Entity()
export class UserFollow extends UserFollowRelations {
  @PrimaryColumn({
    type: 'bigint',
    unsigned: true,
    comment: 'User PK',
  })
  followerId: number;

  @PrimaryColumn({
    type: 'bigint',
    unsigned: true,
    comment: 'User Following User PK',
  })
  followingId: number;

  @CreateDateTimeColumn({
    comment: '팔로잉일시',
  })
  followingAt: DateTime;

  @BeforeInsert()
  protected beforeInsert() {
    this.followingAt = DateTime.local();
  }
}
