import { DateTime } from 'luxon';
import { BeforeInsert, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

import { NotNullBooleanColumn, NotNullColumn, UpdateDateTimeColumn } from '@app/db/decorators';

import { PlaySetting } from '../play-setting';

export class PlayVideoSettingRelations {
  @OneToOne(() => PlaySetting, (e) => e.video, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id' })
  playSetting: PlaySetting;
}

@Entity()
export class PlayVideoSetting extends PlayVideoSettingRelations {
  @PrimaryColumn({
    type: 'bigint',
    unsigned: true,
    comment: 'PlaySetting PK',
  })
  id: number;

  @NotNullBooleanColumn({
    comment: '자동 재생',
    default: true,
  })
  auto: boolean;

  @NotNullColumn({
    type: 'tinyint',
    unsigned: true,
    comment: '확인 시간',
    default: 12,
  })
  confirmTime: number;

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
