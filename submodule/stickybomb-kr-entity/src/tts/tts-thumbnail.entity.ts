import { DateTime } from 'luxon';
import { BeforeInsert, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

import { ImageFileEntity } from 'submodule/stickybomb-kr-entity/src/base';

import { Tts } from './tts.entity';

export class TtsThumbnailRelations extends ImageFileEntity {
  @OneToOne(() => Tts, (e) => e.thumbnail, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  tts: Tts;
}

@Entity()
export class TtsThumbnail extends TtsThumbnailRelations {
  @PrimaryColumn({
    type: 'smallint',
    unsigned: true,
    comment: 'Tts PK',
  })
  readonly ttsId: number;

  @BeforeInsert()
  protected beforeInsert() {
    this.createdAt = DateTime.local();
    this.updatedAt = DateTime.local();
  }
}
