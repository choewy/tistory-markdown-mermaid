import { DateTime } from 'luxon';
import { BeforeInsert, Entity, JoinColumn, JoinTable, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { NotNullColumn, UpdateDateTimeColumn } from '@app/db/decorators';

import { Studio } from '../studio';
import { PlayNotiSetting } from '../play-noti-setting';
import { PlayImageSetting } from '../play-image-setting';
import { PlayRouletteSetting } from '../play-roulette-setting';
import { PlayVideoSetting } from '../play-video-setting';
import { PlaySuperStickerSetting } from '../play-super-sticker-setting';
import { PlaySoundStickerSetting } from '../play-sound-sticker-setting';
import { PlayTtsSetting } from '../play-tts-setting';
import { PlayDefaultSetting } from '../play-default-setting';

export class PlaySettingRelations {
  @OneToOne(() => Studio, (e) => e.playSetting, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  studio: Studio;

  @OneToOne(() => PlayDefaultSetting, (e) => e.playSetting, {
    cascade: true,
  })
  @JoinTable()
  default: PlayDefaultSetting;

  @OneToOne(() => PlayNotiSetting, (e) => e.playSetting, {
    cascade: true,
  })
  @JoinTable()
  noti: PlayNotiSetting;

  @OneToOne(() => PlayTtsSetting, (e) => e.playSetting, {
    cascade: true,
  })
  @JoinTable()
  tts: PlayTtsSetting;

  @OneToOne(() => PlayImageSetting, (e) => e.playSetting, {
    cascade: true,
  })
  @JoinTable()
  image: PlayImageSetting;

  @OneToOne(() => PlaySuperStickerSetting, (e) => e.playSetting, {
    cascade: true,
  })
  @JoinTable()
  superSticker: PlaySuperStickerSetting;

  @OneToOne(() => PlaySoundStickerSetting, (e) => e.playSetting, {
    cascade: true,
  })
  @JoinTable()
  soundSticker: PlaySoundStickerSetting;

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

  @UpdateDateTimeColumn({
    comment: '수정일시',
  })
  updatedAt: DateTime;

  @BeforeInsert()
  protected beforeInsert() {
    this.updatedAt = DateTime.local();
  }
}
