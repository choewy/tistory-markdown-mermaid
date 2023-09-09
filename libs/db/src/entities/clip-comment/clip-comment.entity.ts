import { DateTime } from 'luxon';
import { BeforeInsert, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import {
  CreateDateTimeColumn,
  DeleteDateTimeColumn,
  NotNullColumn,
  NullableDateTimeColumn,
  UpdateDateTimeColumn,
} from '@app/db/decorators';

import { Clip } from '../clip';
import { User } from '../user';

import { ClipCommentStatus } from './enums';

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
  @PrimaryGeneratedColumn({
    type: 'bigint',
    unsigned: true,
    comment: 'PK',
  })
  readonly id: number;

  @NotNullColumn({
    type: 'bigint',
    unsigned: true,
    comment: 'Clip PK',
  })
  clipId: number;

  @NotNullColumn({
    type: 'bigint',
    unsigned: true,
    comment: 'User PK',
  })
  userId: number;

  @NotNullColumn({
    type: 'varchar',
    length: 1024,
    comment: '댓글 내용',
  })
  comment: string;

  @NotNullColumn({
    type: 'enum',
    enum: ClipCommentStatus,
    comment: '상태',
    default: ClipCommentStatus.VISIBLE,
  })
  status: ClipCommentStatus;

  @CreateDateTimeColumn({
    comment: '생성일시',
  })
  createdAt: DateTime;

  @UpdateDateTimeColumn({
    comment: '수정일시',
  })
  updatedAt: DateTime;

  @NullableDateTimeColumn({
    comment: '비공개일시',
    default: null,
  })
  hiddendAt: DateTime | null;

  @DeleteDateTimeColumn({
    comment: '비공개일시',
    default: null,
  })
  deletedAt: DateTime | null;

  @BeforeInsert()
  protected beforeInsert() {
    this.createdAt = DateTime.local();
    this.updatedAt = DateTime.local();
  }
}
