import { DateTime } from 'luxon';
import { BeforeInsert, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

import { NotNullBooleanColumn, NotNullColumn, UpdateDateTimeColumn } from '@app/db/decorators';

import { PlaySetting } from '../play-setting';

export class PlayDefaultSettingRelations {
  @OneToOne(() => PlaySetting, (e) => e.default, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id' })
  playSetting: PlaySetting;
}

@Entity()
export class PlayDefaultSetting extends PlayDefaultSettingRelations {
  @PrimaryColumn({
    type: 'bigint',
    unsigned: true,
    comment: 'PlaySetting PK',
  })
  id: number;

  @NotNullBooleanColumn({
    comment: '자동 재생 여부',
    default: true,
  })
  auto: boolean;

  @NotNullColumn({
    type: 'tinyint',
    comment: '재생 시간',
    default: 10,
  })
  duration: number;

  @NotNullColumn({
    type: 'tinyint',
    comment: '재생 딜레이',
    default: 6,
  })
  delay: number;

  @NotNullBooleanColumn({
    comment: '칭호 노출 여부',
    default: true,
  })
  achievement: boolean;

  @UpdateDateTimeColumn({
    comment: '수정일시',
  })
  updatedAt: DateTime;

  @BeforeInsert()
  protected beforeInsert() {
    this.updatedAt = DateTime.local();
  }
}
