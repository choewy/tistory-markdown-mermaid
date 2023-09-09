import { DateTime } from 'luxon';
import { BeforeInsert, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

import { NotNullColumn, UpdateDateTimeColumn } from '@app/db/decorators';

import { PlaySetting } from '../play-setting';

export class PlayNotiSettingRelations {
  @OneToOne(() => PlaySetting, (e) => e.noti, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id' })
  playSetting: PlaySetting;

  notiSound: any;
}

@Entity()
export class PlayNotiSetting extends PlayNotiSettingRelations {
  @PrimaryColumn({
    type: 'bigint',
    unsigned: true,
    comment: 'PlaySetting PK',
  })
  id: number;

  @NotNullColumn({
    type: 'varchar',
    length: 100,
    comment: '알림 텍스트',
    default: '',
  })
  text: string;

  @NotNullColumn({
    type: 'tinyint',
    unsigned: true,
    comment: '볼륨',
    default: 50,
  })
  volume: number;

  @NotNullColumn({
    type: 'char',
    length: 7,
    comment: '강조 색상',
    default: '#ffffff',
  })
  highlightColor: string;

  @NotNullColumn({
    type: 'varchar',
    length: 50,
    comment: '강조 효과',
    default: 'PURSE',
  })
  highlightEffect: string;

  @NotNullColumn({
    type: 'varchar',
    length: 50,
    comment: '등장 효과',
    default: 'PURSE',
  })
  appearanceEffect: string;

  @NotNullColumn({
    type: 'varchar',
    length: 50,
    comment: '퇴장 효과',
    default: 'PURSE',
  })
  disappearanceEffect: string;

  @UpdateDateTimeColumn({
    comment: '수정일시',
  })
  updatedAt: DateTime;

  @BeforeInsert()
  protected beforeInsert() {
    this.updatedAt = DateTime.local();
  }
}
