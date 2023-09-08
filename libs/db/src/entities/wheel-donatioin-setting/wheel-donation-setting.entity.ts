import { DateTime } from 'luxon';
import { BeforeInsert, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { NotNullBooleanColumn, NotNullColumn, UpdateDateTimeColumn } from '@app/db/decorators';

import { DonationSetting } from '../donation-setting';

export class WheelDonationSettingRelations {
  @OneToOne(() => DonationSetting, (e) => e.wheelDonationSetting, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  donationSetting: DonationSetting;
}

@Entity()
export class WheelDonationSetting extends WheelDonationSettingRelations {
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

  @NotNullBooleanColumn({
    comment: '후원 가능 여부',
    default: true,
  })
  active: boolean;

  @NotNullColumn({
    type: 'int',
    unsigned: true,
    comment: '항목 후원 금액',
    default: 1000,
  })
  cash: number;

  @NotNullColumn({
    type: 'int',
    unsigned: true,
    comment: '리롤 후원 금액',
    default: 1000,
  })
  rerollCash: number;

  @UpdateDateTimeColumn({
    comment: '수정일시',
  })
  updatedAt: DateTime;

  @BeforeInsert()
  protected beforeInsert() {
    this.updatedAt = DateTime.local();
  }
}