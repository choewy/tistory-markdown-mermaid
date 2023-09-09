import { DateTime } from 'luxon';
import { BeforeInsert, Entity, JoinColumn, JoinTable, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { NotNullBooleanColumn, NotNullColumn, NullableColumn, UpdateDateTimeColumn } from '@app/db/decorators';

import { Studio } from '../studio';
import { SuperStickerDonationSetting } from '../super-sticker-donation-setting';
import { VideoDonationSetting } from '../video-donation-setting';
import { WheelDonationSetting } from '../wheel-donatioin-setting';

export class DonationSettingRelations {
  @OneToOne(() => Studio, (e) => e.donationSetting, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  studio: Studio;

  @OneToOne(() => SuperStickerDonationSetting, (e) => e.donationSetting, {
    nullable: true,
    cascade: true,
  })
  @JoinTable()
  superSticker: SuperStickerDonationSetting | null;

  @OneToOne(() => VideoDonationSetting, (e) => e.donationSetting, {
    nullable: true,
    cascade: true,
  })
  @JoinTable()
  video: VideoDonationSetting | null;

  @OneToOne(() => WheelDonationSetting, (e) => e.donationSetting, {
    nullable: true,
    cascade: true,
  })
  @JoinTable()
  wheel: WheelDonationSetting | null;
}

@Entity()
export class DonationSetting extends DonationSettingRelations {
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

  @NullableColumn({
    type: 'varchar',
    length: 1024,
    default: null,
    comment: '후원 금지 단어',
  })
  forbiddenWords: string | null;

  @NotNullBooleanColumn({
    default: true,
    comment: '후원 가능 여부',
  })
  active: boolean;

  @UpdateDateTimeColumn({
    comment: '수정일시',
  })
  updatedAt: DateTime;

  @BeforeInsert()
  protected beforeInsert() {
    this.updatedAt = DateTime.local();
  }
}
