import { DateTime } from 'luxon';
import { BeforeInsert, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

import { NotNullColumn, UpdateDateTimeColumn } from '@app/db/decorators';

import { DonationSetting } from '../donation-setting';

export class VideoDonationSettingRelations {
  @OneToOne(() => DonationSetting, (e) => e.video, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id' })
  donationSetting: DonationSetting;
}

@Entity()
export class VideoDonationSetting extends VideoDonationSettingRelations {
  @PrimaryColumn({
    type: 'bigint',
    unsigned: true,
    comment: 'DonationSetting PK',
  })
  readonly id: number;

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
  duration: number;

  @UpdateDateTimeColumn({
    comment: '수정일시',
  })
  updatedAt: DateTime;

  @BeforeInsert()
  protected beforeInsert() {
    this.updatedAt = DateTime.local();
  }
}
