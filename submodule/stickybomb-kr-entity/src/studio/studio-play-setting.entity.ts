import { DateTime } from 'luxon';
import { BeforeInsert, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

import {
  NotNullBooleanColumn,
  NotNullColumn,
  UpdateDateTimeColumn,
} from 'submodule/stickybomb-kr-entity/src/decorators';

import { Studio } from './studio.entity';

export class StudioPlaySettingRelations {
  @OneToOne(() => Studio, (e) => e.playSetting, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  studio: Studio;
}

@Entity()
export class StudioPlaySetting extends StudioPlaySettingRelations {
  @PrimaryColumn({
    type: 'bigint',
    unsigned: true,
    comment: 'Studio PK',
  })
  readonly studioId: number;

  @NotNullColumn({
    type: 'tinyint',
    unsigned: true,
    comment: '후원 재생 시간',
    default: 7,
  })
  duration: number;

  @NotNullColumn({
    type: 'tinyint',
    unsigned: true,
    default: 2,
    comment: '후원 재생 딜레이',
  })
  delay: number;

  @NotNullBooleanColumn({
    comment: '클립 생성 가능 여부',
    default: false,
  })
  canCreateClip: boolean;

  @NotNullBooleanColumn({
    default: true,
    comment: '칭호 노출 여부',
  })
  canExposeAchievement: boolean;

  @NotNullBooleanColumn({
    default: true,
    comment: '이미지 자동 재생 여부',
  })
  canAutoPlayImage: boolean;

  @NotNullColumn({
    type: 'tinyint',
    unsigned: true,
    default: 10,
    comment: '이미지 후원 재생 확인 제한 시간',
  })
  imageConfirTime: number;

  @NotNullBooleanColumn({
    default: true,
    comment: '동영상 자동 재생 여부',
  })
  canAutoPlayVideo: boolean;

  @NotNullColumn({
    type: 'tinyint',
    unsigned: true,
    default: 10,
    comment: '동영상 후원 재생 확인 제한 시간',
  })
  videoConfirmTime: number;

  @UpdateDateTimeColumn({
    comment: '수정일시',
  })
  updatedAt: DateTime;

  @BeforeInsert()
  protected beforeInsert() {
    this.updatedAt = DateTime.local();
  }
}
