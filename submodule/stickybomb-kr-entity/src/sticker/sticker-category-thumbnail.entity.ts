import { DateTime } from 'luxon';
import { BeforeInsert, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

import { ImageFileEntity } from 'submodule/stickybomb-kr-entity/src/base';

import { StickerCategory } from './sticker-category.entity';

export class StickerCategoryThumbnailRelations extends ImageFileEntity {
  @OneToOne(() => StickerCategory, (e) => e.thumbnail, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  category: StickerCategory;
}

@Entity()
export class StickerCategoryThumbnail extends StickerCategoryThumbnailRelations {
  @PrimaryColumn({
    type: 'smallint',
    unsigned: true,
    comment: 'StickerCategory PK',
  })
  readonly categoryId: number;

  @BeforeInsert()
  protected beforeInsert() {
    this.createdAt = DateTime.local();
    this.updatedAt = DateTime.local();
  }
}
