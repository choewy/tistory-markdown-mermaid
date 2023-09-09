import { DateTime } from 'luxon';
import { BeforeInsert, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { CreateDateTimeColumn } from '@app/db/decorators';

import { Clip } from '../clip';
import { User } from '../user';

export class ClipLikeRelations {
  @ManyToOne(() => Clip, (e) => e.clipLikes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  clip: Clip;

  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: User;
}

@Entity()
export class ClipLike extends ClipLikeRelations {
  @PrimaryColumn({
    type: 'bigint',
    unsigned: true,
    comment: 'Clip PK',
  })
  clipId: number;

  @PrimaryColumn({
    type: 'bigint',
    unsigned: true,
    comment: 'User PK',
  })
  userId: number;

  @CreateDateTimeColumn({
    comment: '좋아요일시',
  })
  createdAt: DateTime;

  @BeforeInsert()
  protected beforeInsert() {
    this.createdAt = DateTime.local();
  }
}
