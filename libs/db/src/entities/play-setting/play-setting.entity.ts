import { DateTime } from 'luxon';
import { BeforeInsert, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { NotNullBooleanColumn, NotNullColumn, UpdateDateTimeColumn } from '@app/db/decorators';

import { Studio } from '../studio';

export class PlaySettingRelations {
  @OneToOne(() => Studio, (e) => e.playSetting, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  studio: Studio;
}

@Entity()
export class PlaySetting extends PlaySettingRelations {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    unsigned: true,
    comment: 'PK',
  })
  readonly id: number;

  @NotNullColumn({
    type: 'bigint',
    unsigned: true,
    comment: 'Studio PK',
  })
  studioId: number;

  @NotNullColumn({
    type: 'tinyint',
    comment: '후원 노출 시간',
    default: 10,
  })
  duration: number;

  @NotNullColumn({
    type: 'tinyint',
    comment: '후원 재생 딜레이',
    default: 2,
  })
  delay: number;

  @NotNullBooleanColumn({
    comment: '이미지 자동 재생 여부',
    default: true,
  })
  imageAuto: boolean;

  @NotNullColumn({
    type: 'tinyint',
    comment: '이미지 확인 시간',
    default: 12,
  })
  imageConfirmTime: number;

  @NotNullBooleanColumn({
    comment: '영상 자동 재생 여부',
    default: true,
  })
  videoAuto: boolean;

  @NotNullColumn({
    type: 'tinyint',
    unsigned: true,
    comment: '영상 확인 시간',
    default: 12,
  })
  videoConfirmTime: number;

  @NotNullBooleanColumn({
    comment: '칭호 노출 여부',
    default: true,
  })
  achievementExpose: boolean;

  @UpdateDateTimeColumn({
    comment: '수정일시',
  })
  updatedAt: DateTime;

  @BeforeInsert()
  protected beforeInsert() {
    this.updatedAt = DateTime.local();
  }
}
