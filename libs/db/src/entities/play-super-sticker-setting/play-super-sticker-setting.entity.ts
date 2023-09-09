import { DateTime } from 'luxon';
import { BeforeInsert, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

import { NotNullBooleanColumn, NotNullColumn, UpdateDateTimeColumn } from '@app/db/decorators';

import { PlaySetting } from '../play-setting';

export class PlaySuperStickerSettingRelations {
  @OneToOne(() => PlaySetting, (e) => e.superSticker, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id' })
  playSetting: PlaySetting;
}

@Entity()
export class PlaySuperStickerSetting extends PlaySuperStickerSettingRelations {
  @PrimaryColumn({
    type: 'bigint',
    unsigned: true,
    comment: 'PlaySetting PK',
  })
  id: number;

  @NotNullBooleanColumn({
    comment: '재생 여부',
    default: true,
  })
  active: boolean;

  @NotNullColumn({
    type: 'tinyint',
    unsigned: true,
    comment: '재생 시간',
    default: 12,
  })
  duration: number;

  @UpdateDateTimeColumn({
    comment: '수정일시',
  })
  updatedAt: DateTime;

  @BeforeInsert()
  protected beforeInsert() {
    this.updatedAt = DateTime.local();
  }
}
