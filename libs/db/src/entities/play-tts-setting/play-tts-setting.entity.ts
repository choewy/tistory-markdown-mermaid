import { BeforeInsert, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

import { PlaySetting } from '../play-setting';
import { NotNullBooleanColumn, NotNullColumn, UpdateDateTimeColumn } from '@app/db/decorators';
import { DateTime } from 'luxon';

export class PlayTtsSettingRelations {
  @OneToOne(() => PlaySetting, (e) => e.tts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id' })
  playSetting: PlaySetting;
}

@Entity()
export class PlayTtsSetting extends PlayTtsSettingRelations {
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
