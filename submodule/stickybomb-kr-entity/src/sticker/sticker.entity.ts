import { DateTime } from 'luxon';
import {
  BeforeInsert,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import {
  CreateDateTimeColumn,
  NotNullBooleanColumn,
  NotNullColumn,
  NullableColumn,
  NullableDateTimeColumn,
  UpdateDateTimeColumn,
} from '@submodule/entity/decorators';

import { StickerStatus, StickerType } from './enums';
import { StickerCategory } from './sticker-category.entity';
import { StickerThumbnail } from './sticker-thumbnail.entity';
import { StickerVideo } from './sticker-video.entity';
import { StickerImage } from './sticker-image.entity';

export class StickerRelations {
  @ManyToOne(() => StickerCategory, (e) => e.stickers, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn()
  category: StickerCategory | null;

  @OneToOne(() => StickerThumbnail, (e) => e.sticker, {
    cascade: ['insert', 'update', 'remove'],
    nullable: true,
  })
  @JoinTable()
  thumbnail: Promise<StickerThumbnail | null> | StickerThumbnail | null;

  @OneToOne(() => StickerThumbnail, (e) => e.sticker, {
    cascade: ['insert', 'update', 'remove'],
    nullable: true,
  })
  @JoinTable()
  video: Promise<StickerVideo | null> | StickerVideo | null;

  @OneToOne(() => StickerImage, (e) => e.sticker, {
    cascade: ['insert', 'update', 'remove'],
    nullable: true,
  })
  @JoinTable()
  image: Promise<StickerImage | null> | StickerImage | null;
}

@Entity()
export class Sticker extends StickerRelations {
  @PrimaryGeneratedColumn({
    type: 'smallint',
    unsigned: true,
    comment: 'PK',
  })
  readonly id: number;

  @Index()
  @NullableColumn({
    type: 'smallint',
    unsigned: true,
    comment: 'Sticker Category PK',
  })
  categoryId: number | null;

  @NotNullColumn({
    type: 'enum',
    enum: StickerType,
    comment: '구분',
  })
  type: StickerType;

  @NotNullBooleanColumn({
    comment: '애니메이션 포함 여부',
  })
  hasAnimation: boolean;

  @NotNullBooleanColumn({
    comment: '소리 포함 여부',
  })
  hasSound: boolean;

  @NotNullColumn({
    type: 'int',
    unsigned: true,
    comment: '가격',
    default: 0,
  })
  price: number;

  @NotNullColumn({
    type: 'enum',
    enum: StickerStatus,
    comment: '상태',
  })
  status: StickerStatus;

  @CreateDateTimeColumn({
    comment: '동록일시',
  })
  createdAt: DateTime;

  @UpdateDateTimeColumn({
    comment: '수정일시',
  })
  updatedAt: DateTime;

  @NullableDateTimeColumn({
    default: null,
    comment: '활성일시',
  })
  activatedAt: DateTime | null;

  @NullableDateTimeColumn({
    default: null,
    comment: '비활성일시',
  })
  disabledAt: DateTime | null;

  @NullableDateTimeColumn({
    default: null,
    comment: '삭제일시',
  })
  deletedAt: DateTime | null;

  @BeforeInsert()
  protected beforeInsert() {
    this.createdAt = DateTime.local();
    this.updatedAt = DateTime.local();
  }
}
