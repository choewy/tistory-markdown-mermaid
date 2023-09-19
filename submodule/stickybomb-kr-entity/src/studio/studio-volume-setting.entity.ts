import { DateTime } from 'luxon';
import { BeforeInsert, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

import { NotNullColumn, UpdateDateTimeColumn } from '@submodule/entity/decorators';
import { Studio } from './studio.entity';

export class StudioVolumeSettingRelations {
  @OneToOne(() => Studio, (e) => e.volumeSetting, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  studio: Studio;
}

@Entity()
export class StudioVolumeSetting extends StudioVolumeSettingRelations {
  @PrimaryColumn({
    type: 'bigint',
    unsigned: true,
    comment: 'Studio PK',
  })
  readonly studioId: number;

  @NotNullColumn({
    type: 'tinyint',
    unsigned: true,
    comment: '알림음 볼륨',
    default: 50,
  })
  notice: number;

  @NotNullColumn({
    type: 'tinyint',
    unsigned: true,
    comment: '메시지 TTS 볼륨',
    default: 50,
  })
  messageTts: number;

  @NotNullColumn({
    type: 'tinyint',
    unsigned: true,
    comment: '스티커 볼륨',
    default: 50,
  })
  sticker: number;

  @NotNullColumn({
    type: 'tinyint',
    unsigned: true,
    comment: '영상 볼륨',
    default: 50,
  })
  video: number;

  @NotNullColumn({
    type: 'tinyint',
    unsigned: true,
    comment: '룰렛 볼륨',
    default: 50,
  })
  roulette: number;

  @NotNullColumn({
    type: 'tinyint',
    unsigned: true,
    comment: '돌림판 TTS 볼륨',
    default: 50,
  })
  wheelTts: number;

  @UpdateDateTimeColumn({
    comment: '수정일시',
  })
  updatedAt: DateTime;

  @BeforeInsert()
  protected beforeInsert() {
    this.updatedAt = DateTime.local();
  }
}
