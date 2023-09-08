import { DateTime } from 'luxon';
import { BeforeInsert, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import {
  NotNullBooleanColumn,
  NotNullColumn,
  NullableColumn,
  NullableDateTimeColumn,
  UpdateDateTimeColumn,
} from '@app/db/decorators';

import { Studio } from '../studio';
import { BroadcastPlatform } from './enums';

export class BroadcastRelations {
  @OneToOne(() => Studio, (e) => e.broadcast, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  studio: Studio;
}

@Entity()
export class Broadcast extends BroadcastRelations {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    unsigned: true,
    comment: 'PK',
  })
  readonly id: number;

  @NotNullColumn({
    type: 'bigint',
    unsigned: true,
    comment: 'Studio PK',
  })
  studioId: number;

  @NotNullColumn({
    type: 'enum',
    enum: BroadcastPlatform,
  })
  platform: BroadcastPlatform;

  @NullableColumn({
    type: 'varchar',
    length: 1024,
    comment: '스트리밍 주소',
    default: null,
  })
  url: string | null;

  @NullableColumn({
    type: 'varchar',
    length: 1024,
    comment: '방송 제목',
    default: null,
  })
  title: string | null;

  @NullableColumn({
    type: 'varchar',
    length: 1024,
    comment: '방송 카테고리',
    default: null,
  })
  category: string | null;

  @NotNullBooleanColumn({
    comment: '스트리밍 여부',
    default: false,
  })
  online: boolean;

  @NullableDateTimeColumn({
    comment: '스트리밍 시작일시',
    default: null,
  })
  onlineAt: DateTime | null;

  @NullableDateTimeColumn({
    comment: '스트리밍 종료일시',
    default: null,
  })
  offlineAt: DateTime | null;

  @UpdateDateTimeColumn({
    comment: '수정일시',
  })
  updatedAt: DateTime;

  @BeforeInsert()
  protected beforeInsert() {
    this.updatedAt = DateTime.local();
  }
}
