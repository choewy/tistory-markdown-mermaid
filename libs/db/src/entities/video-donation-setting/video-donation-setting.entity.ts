import { DateTime } from 'luxon';
import { BeforeInsert, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { NotNullColumn, UpdateDateTimeColumn } from '@app/db/decorators';

import { DonationSetting } from '../donation-setting';

export class VideoDonationSettingRelations {
  @OneToOne(() => DonationSetting, (e) => e.videoDonationSetting, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  donationSetting: DonationSetting;
}

@Entity()
export class VideoDonationSetting extends VideoDonationSettingRelations {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    unsigned: true,
    comment: 'PK',
  })
  readonly id: number;

  @NotNullColumn({
    type: 'bigint',
    unsigned: true,
    comment: 'DonationSetting PK',
  })
  donationSettingId: number;

  @NotNullColumn({
    type: 'int',
    unsigned: true,
    comment: '최소 후원 금액',
    default: 1000,
  })
  minCash: number;

  @NotNullColumn({
    type: 'int',
    unsigned: true,
    comment: '최대 후원 금액',
    default: 1000000,
  })
  maxCash: number;

  @NotNullColumn({
    type: 'int',
    unsigned: true,
    comment: '초당 금액',
    default: 80,
  })
  pricePerSecond: number;

  @NotNullColumn({
    type: 'smallint',
    unsigned: true,
    comment: '영상 재생 제한 시간',
    default: 60,
  })
  durationLimit: number;

  @UpdateDateTimeColumn({
    comment: '수정일시',
  })
  updatedAt: DateTime;

  @BeforeInsert()
  protected beforeInsert() {
    this.updatedAt = DateTime.local();
  }
}
