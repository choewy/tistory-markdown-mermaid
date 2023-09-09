import { DateTime } from 'luxon';
import { BeforeInsert, Entity, JoinColumn, JoinTable, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { NotNullBooleanColumn, NotNullColumn, UpdateDateTimeColumn } from '@app/db/decorators';

import { Studio } from '../studio';
import { PlayNotiSetting } from '../play-noti-setting';
import { PlayImageSetting } from '../play-image-setting';
import { PlayRouletteSetting } from '../play-roulette-setting';
import { PlayVideoSetting } from '../play-video-setting';

export class PlaySettingRelations {
  @OneToOne(() => Studio, (e) => e.playSetting, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  studio: Studio;

  @OneToOne(() => PlayNotiSetting, (e) => e.playSetting, {
    cascade: true,
  })
  @JoinTable()
  noti: PlayNotiSetting;

  @OneToOne(() => PlayImageSetting, (e) => e.playSetting, {
    cascade: true,
  })
  @JoinTable()
  image: PlayImageSetting;

  @OneToOne(() => PlayRouletteSetting, (e) => e.playSetting, {
    cascade: true,
  })
  @JoinTable()
  roulette: PlayRouletteSetting;

  @OneToOne(() => PlayRouletteSetting, (e) => e.playSetting, {
    cascade: true,
  })
  @JoinTable()
  video: PlayVideoSetting;
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
