import { DateTime } from 'luxon';
import { BeforeInsert, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

import { NotNullColumn, UpdateDateTimeColumn } from '@app/db/decorators';

import { Clip } from '../clip';

export class ClipDetailRelations {
  @OneToOne(() => Clip, (e) => e.clipDetail, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  clip: Clip;
}

@Entity()
export class ClipDetail extends ClipDetailRelations {
  @PrimaryColumn({
    type: 'bigint',
    unsigned: true,
    comment: 'Clip PK',
  })
  clipId: number;

  @NotNullColumn({
    type: 'bigint',
    unsigned: true,
    comment: '조회수',
    default: 0,
  })
  hit: number;

  @NotNullColumn({
    type: 'bigint',
    unsigned: true,
    comment: '좋아요 수',
    default: 0,
  })
  like: number;

  @NotNullColumn({
    type: 'bigint',
    unsigned: true,
    comment: '댓글 수',
    default: 0,
  })
  comment: number;

  @UpdateDateTimeColumn({
    comment: '수정일시',
  })
  updatedAt: DateTime;

  @BeforeInsert()
  protected beforeInsert() {
    this.updatedAt = DateTime.local();
  }
}
