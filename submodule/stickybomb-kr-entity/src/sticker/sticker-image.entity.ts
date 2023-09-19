import { DateTime } from 'luxon';
import { BeforeInsert, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

import { ImageFileEntity } from '@submodule/entity/base';

import { Sticker } from './sticker.entity';

export class StickerImageRelations extends ImageFileEntity {
  @OneToOne(() => Sticker, (e) => e.thumbnail, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  sticker: Sticker;
}

@Entity()
export class StickerImage extends StickerImageRelations {
  @PrimaryColumn({
    type: 'smallint',
    unsigned: true,
    comment: 'Sticker PK',
  })
  readonly stickerId: number;

  @BeforeInsert()
  protected beforeInsert() {
    this.createdAt = DateTime.local();
    this.updatedAt = DateTime.local();
  }
}
