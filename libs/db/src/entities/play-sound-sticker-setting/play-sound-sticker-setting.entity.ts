import { DateTime } from 'luxon';
import { BeforeInsert, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

import { NotNullColumn, UpdateDateTimeColumn } from '@app/db/decorators';

import { PlaySetting } from '../play-setting';

export class PlaySoundStickerSettingRelations {
  @OneToOne(() => PlaySetting, (e) => e.soundSticker, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id' })
  playSetting: PlaySetting;
}

@Entity()
export class PlaySoundStickerSetting extends PlaySoundStickerSettingRelations {
  @PrimaryColumn({
    type: 'bigint',
    unsigned: true,
    comment: 'PlaySetting PK',
  })
  id: number;

  @NotNullColumn({
    type: 'tinyint',
    unsigned: true,
    comment: '볼륨',
    default: 50,
  })
  volume: number;

  @UpdateDateTimeColumn({
    comment: '수정일시',
  })
  updatedAt: DateTime;

  @BeforeInsert()
  protected beforeInsert() {
    this.updatedAt = DateTime.local();
  }
}
