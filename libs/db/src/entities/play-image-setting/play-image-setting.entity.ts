import { DateTime } from 'luxon';
import { BeforeInsert, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

import { NotNullBooleanColumn, NotNullColumn, UpdateDateTimeColumn } from '@app/db/decorators';

import { PlaySetting } from '../play-setting';

export class PlayImageSettingRelations {
  @OneToOne(() => PlaySetting, (e) => e.image, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id' })
  playSetting: PlaySetting;
}

@Entity()
export class PlayImageSetting extends PlayImageSettingRelations {
  @PrimaryColumn({
    type: 'bigint',
    unsigned: true,
    comment: 'PlaySetting PK',
  })
  id: number;

  @NotNullBooleanColumn({
    comment: '이미지 자동 재생 여부',
    default: true,
  })
  auto: boolean;

  @NotNullColumn({
    type: 'tinyint',
    comment: '이미지 확인 시간',
    default: 12,
  })
  confirmTime: number;

  @UpdateDateTimeColumn({
    comment: '수정일시',
  })
  updatedAt: DateTime;

  @BeforeInsert()
  protected beforeInsert() {
    this.updatedAt = DateTime.local();
  }
}
