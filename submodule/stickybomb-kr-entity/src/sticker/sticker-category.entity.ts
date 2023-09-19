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
  NotNullColumn,
  NullableColumn,
  NullableDateTimeColumn,
  UpdateDateTimeColumn,
} from '@entity/decorators';
import { Studio } from '@entity/studio';

import { StickerCategoryScope, StickerCategoryStatus } from './enums';
import { StickerCategoryThumbnail } from './sticker-category-thumbnail.entity';
import { Sticker } from './sticker.entity';

export class StickerCategoryRelations {
  @ManyToOne(() => Studio, (e) => e.stickerCategory, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn()
  studio: Studio | null;

  @OneToOne(() => StickerCategoryThumbnail, (e) => e.category, {
    cascade: ['insert', 'update', 'remove'],
    lazy: true,
  })
  @JoinTable()
  thumbnail: Promise<StickerCategoryThumbnail> | StickerCategoryThumbnail;

  @ManyToOne(() => Sticker, (e) => e.category, {
    cascade: ['insert', 'update', 'remove'],
    lazy: true,
  })
  @JoinTable()
  stickers: Promise<Sticker[]> | Sticker[];
}

@Entity()
export class StickerCategory extends StickerCategoryRelations {
  @PrimaryGeneratedColumn({
    type: 'smallint',
    unsigned: true,
    comment: 'PK',
  })
  readonly id: number;

  @Index()
  @NullableColumn({
    type: 'bigint',
    unsigned: true,
    comment: 'Studio PK',
  })
  studioId: number | null;

  @NotNullColumn({
    type: 'smallint',
    unsigned: true,
    comment: '순서',
  })
  sequence: number;

  @NotNullColumn({
    type: 'enum',
    enum: StickerCategoryScope,
    comment: '공개범위',
  })
  scope: StickerCategoryScope;

  @NotNullColumn({
    type: 'enum',
    enum: StickerCategoryStatus,
    comment: '상태',
    default: StickerCategoryStatus.DISABLED,
  })
  status: StickerCategoryStatus;

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
