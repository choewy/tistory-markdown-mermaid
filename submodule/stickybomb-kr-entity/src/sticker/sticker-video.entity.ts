import { DateTime } from 'luxon';
import { BeforeInsert, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

import { VideoFileEntity } from '@submodule/entity/base';

import { Sticker } from './sticker.entity';

export class StickerVideoRelations extends VideoFileEntity {
  @OneToOne(() => Sticker, (e) => e.thumbnail, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  sticker: Sticker;
}

@Entity()
export class StickerVideo extends StickerVideoRelations {
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
