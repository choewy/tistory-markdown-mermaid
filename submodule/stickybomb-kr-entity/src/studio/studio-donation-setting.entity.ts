import { DateTime } from 'luxon';
import { BeforeInsert, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

import { NotNullBooleanColumn, NotNullColumn, UpdateDateTimeColumn } from '@submodule/entity/decorators';
import { Studio } from './studio.entity';

export class StudioDonationSettingRelations {
  @OneToOne(() => Studio, (e) => e.donationSetting, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  studio: Studio;
}

@Entity()
export class StudioDonationSetting extends StudioDonationSettingRelations {
  @PrimaryColumn({
    type: 'bigint',
    unsigned: true,
    comment: 'Studio PK',
  })
  readonly studioId: number;

  @NotNullColumn({
    type: 'varchar',
    length: 2024,
    comment: '후원 금지어',
    default: '',
  })
  forbiddenWords: string;

  @NotNullBooleanColumn({
    default: true,
    comment: '후원 가능 여부',
  })
  isActiveDonation: boolean;

  @NotNullColumn({
    type: 'int',
    unsigned: true,
    comment: '후원 최소 금액',
    default: 1000,
  })
  donationMinAmount: number;

  @NotNullColumn({
    type: 'int',
    unsigned: true,
    comment: '후원 최대 금액',
    default: 1000000,
  })
  donationMaxAmount: number;

  @NotNullBooleanColumn({
    default: true,
    comment: '슈퍼스티커 후원 가능 여부',
  })
  isActiveSuperSticker: boolean;

  @NotNullColumn({
    type: 'int',
    unsigned: true,
    comment: '슈퍼스티커 후원 최소 금액',
    default: 10000,
  })
  superStickerMinAmount: number;

  @NotNullColumn({
    type: 'int',
    unsigned: true,
    comment: '슈퍼스티커 후원 최대 금액',
    default: 1000000,
  })
  superStickerMaxAmount: number;

  @NotNullBooleanColumn({
    default: true,
    comment: '동영상 후원 가능 여부',
  })
  isActiveVideo: boolean;

  @NotNullColumn({
    type: 'int',
    unsigned: true,
    comment: '동영상 후원 최소 금액',
    default: 1000,
  })
  videoMinAmount: number;

  @NotNullColumn({
    type: 'int',
    unsigned: true,
    comment: '동영상 후원 초당 금액',
    default: 30,
  })
  videoPerSecondAmount: number;

  @NotNullColumn({
    type: 'int',
    unsigned: true,
    comment: '동영상 최대 후원 가능 시간',
    default: 60,
  })
  videoMaxSecond: number;

  @NotNullBooleanColumn({
    default: true,
    comment: '돌림판 후원 가능 여부',
  })
  isActiveWheel: boolean;

  @NotNullColumn({
    type: 'int',
    unsigned: true,
    comment: '돌림판 후원 금액',
    default: 1000,
  })
  wheelAmount: number;

  @NotNullColumn({
    type: 'int',
    unsigned: true,
    comment: '돌림판 리롤 금액',
    default: 10000,
  })
  wheelRerollAmount: number;

  @UpdateDateTimeColumn({
    comment: '수정일시',
  })
  updatedAt: DateTime;

  @BeforeInsert()
  protected beforeInsert() {
    this.updatedAt = DateTime.local();
  }
}
