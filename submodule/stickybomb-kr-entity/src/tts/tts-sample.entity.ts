import { DateTime } from 'luxon';
import { BeforeInsert, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

import { SoundFileEntity } from '@entity/base';

import { Tts } from './tts.entity';

export class TtsSampleRelations extends SoundFileEntity {
  @OneToOne(() => Tts, (e) => e.sample)
  @JoinColumn()
  tts: Tts;
}

@Entity()
export class TtsSample extends TtsSampleRelations {
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
