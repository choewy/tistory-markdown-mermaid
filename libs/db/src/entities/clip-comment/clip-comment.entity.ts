import { DateTime } from 'luxon';
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { CreateDateTimeColumn } from '@app/db/decorators';

import { Clip } from '../clip';
import { User } from '../user';

export class ClipCommentRelations {
  @ManyToOne(() => Clip, (e) => e.clipComments, {
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
export class ClipComment extends ClipCommentRelations {
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
    comment: '댓글생성일시',
  })
  createdAt: DateTime;
}
