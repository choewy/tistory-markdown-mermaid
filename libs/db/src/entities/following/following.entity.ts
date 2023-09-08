import { DateTime } from 'luxon';
import { BeforeInsert, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { CreateDateTimeColumn } from '@app/db/decorators';

import { User } from '../user';

export class FollowingRelations {
  @ManyToOne(() => User, (user) => user.following)
  @JoinColumn()
  user: User;

  @ManyToOne(() => User, (user) => user.followers)
  @JoinColumn()
  followedUser: User;
}

@Entity()
export class Following extends FollowingRelations {
  @PrimaryColumn({ type: 'bigint', unsigned: true })
  userId: number;

  @PrimaryColumn({ type: 'bigint', unsigned: true })
  followedUserId: number;

  @CreateDateTimeColumn({
    comment: '생성일시',
  })
  createdAt: DateTime;

  @BeforeInsert()
  protected beforeInsert() {
    this.createdAt = DateTime.local();
  }
}
