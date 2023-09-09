import Decimal from 'decimal.js';
import { DateTime } from 'luxon';
import {
  BeforeInsert,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import {
  CreateDateTimeColumn,
  DeleteDateTimeColumn,
  NotNullColumn,
  NotNullDecimalColumn,
  NullableColumn,
  NullableDateTimeColumn,
} from '@app/db/decorators';

import { User } from '../user';
import { ClipDetail } from '../clip-detail';
import { ClipLike } from '../clip-like';
import { ClipStatus } from './enums';

export class ClipRelations {
  @OneToOne(() => ClipDetail, (e) => e.clip, {
    cascade: true,
  })
  @JoinTable()
  clipDetail: ClipDetail;

  @OneToMany(() => ClipLike, (e) => e.clip, {
    cascade: true,
  })
  @JoinTable()
  clipLikes: ClipLike[];

  @OneToMany(() => ClipLike, (e) => e.clip, {
    cascade: true,
  })
  @JoinTable()
  clipComments: ClipLike[];

  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  creator: User;

  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  viewer: User;
}

@Entity()
export class Clip extends ClipRelations {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    unsigned: true,
    comment: 'PK',
  })
  readonly id: number;

  @NotNullColumn({
    type: 'bigint',
    unsigned: true,
    comment: 'Creator PK',
  })
  creatorId: number;

  @NotNullColumn({
    type: 'bigint',
    unsigned: true,
    comment: 'Viewer PK',
  })
  viewerId: number;

  @NotNullColumn({
    type: 'varchar',
    length: 1024,
    comment: '클립 제목',
  })
  title: string;

  @NullableColumn({
    type: 'varchar',
    length: 1024,
    comment: 'M3U8 ID',
    default: null,
  })
  m3u8Id: string | null;

  @NullableColumn({
    type: 'varchar',
    length: 1024,
    comment: 'M3U8 Temp ID',
    default: null,
  })
  m3u8VideoIdTemp: string | null;

  @NullableColumn({
    type: 'varchar',
    length: 1024,
    comment: 'MP4 Temp ID',
    default: null,
  })
  mp4VideoIdTemp: string | null;

  @NullableColumn({
    type: 'varchar',
    length: 1024,
    comment: 'Video ID',
    default: null,
  })
  videoId: string | null;

  @NullableColumn({
    type: 'varchar',
    length: 1024,
    comment: 'Video URL',
    default: null,
  })
  videoUrl: string | null;

  @NotNullColumn({
    type: 'smallint',
    unsigned: true,
    comment: '시작시간(초)',
  })
  startTime: number;

  @NotNullColumn({
    type: 'smallint',
    unsigned: true,
    comment: '끝시간(초)',
  })
  endTime: number;

  @NotNullDecimalColumn({
    precision: 5,
    scale: 2,
    comment: '영상 길이',
    default: 0,
  })
  duration: Decimal;

  @NullableColumn({
    type: 'varchar',
    length: 1024,
    comment: '썸네일 URL',
    default: null,
  })
  thumbnailUrl: string | null;

  @NullableColumn({
    type: 'varchar',
    length: 5012,
    comment: '클립 생성 실패 이유',
    default: null,
  })
  failReason: string | null;

  @NotNullColumn({
    type: 'enum',
    enum: ClipStatus,
    comment: '상태',
    default: ClipStatus.M3U8_UPLOADING,
  })
  status: ClipStatus;

  @CreateDateTimeColumn({
    comment: '생성일시',
  })
  createdAt: DateTime;

  @DeleteDateTimeColumn({
    comment: '삭제일시',
  })
  deletedAt: DateTime | null;

  @NullableDateTimeColumn({
    comment: 'MP4 변환일시',
  })
  mp4EncodingAt: DateTime | null;

  @NullableDateTimeColumn({
    comment: 'MP4 업로드일시',
  })
  mp4UploadingAt: DateTime | null;

  @NullableDateTimeColumn({
    comment: '처리일시',
  })
  creatingClipAt: DateTime | null;

  @NullableDateTimeColumn({
    comment: '변환일시',
  })
  transcodingAt: DateTime | null;

  @NullableDateTimeColumn({
    comment: '생성완료일시',
  })
  completedAt: DateTime | null;

  @NullableDateTimeColumn({
    comment: '생성실패일시',
  })
  failedAt: DateTime | null;

  @BeforeInsert()
  protected beforeInsert() {
    this.createdAt = DateTime.local();
  }
}
