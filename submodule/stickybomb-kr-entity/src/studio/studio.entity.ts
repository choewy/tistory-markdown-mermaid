import { DateTime } from 'luxon';
import {
  BeforeInsert,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { CreateDateTimeColumn, NotNullColumn, UpdateDateTimeColumn } from '@submodule/entity/decorators';
import { User } from '@submodule/entity/user';
import { Overlay } from '@submodule/entity/overlay';
import { NoticeSound } from '@submodule/entity/notice';
import { StickerCategory } from '@submodule/entity/sticker';

import { StudioBroadcast } from './studio-broadcast.entity';
import { StudioDonationSetting } from './studio-donation-setting.entity';
import { StudioPlaySetting } from './studio-play-setting.entity';
import { StudioVolumeSetting } from './studio-volume-setting.entity';
import { StudioNoticeSetting } from './studio-notice-setting.entity';
import { StudioBan } from './studio-ban.entity';

export class StudioRelations {
  @OneToOne(() => User, (e) => e.studio, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: User;

  @OneToMany(() => StudioBroadcast, (e) => e.studio, {
    cascade: ['insert', 'update', 'remove'],
    lazy: true,
  })
  @JoinTable()
  broadcasts: Promise<StudioBroadcast[]> | StudioBroadcast[];

  @OneToOne(() => StudioDonationSetting, (e) => e.studio, {
    cascade: ['insert', 'update', 'remove'],
    lazy: true,
  })
  @JoinTable()
  donationSetting: Promise<StudioDonationSetting> | StudioDonationSetting;

  @OneToOne(() => StudioVolumeSetting, (e) => e.studio, {
    cascade: ['insert', 'update', 'remove'],
    lazy: true,
  })
  @JoinTable()
  volumeSetting: Promise<StudioVolumeSetting> | StudioVolumeSetting;

  @OneToOne(() => StudioPlaySetting, (e) => e.studio, {
    cascade: ['insert', 'update', 'remove'],
    lazy: true,
  })
  @JoinTable()
  playSetting: Promise<StudioPlaySetting> | StudioPlaySetting;

  @OneToMany(() => StudioNoticeSetting, (e) => e.studio, {
    cascade: ['insert', 'update', 'remove'],
    lazy: true,
  })
  @JoinTable()
  noticeSettings: Promise<StudioNoticeSetting[]> | StudioNoticeSetting[];

  @OneToMany(() => Overlay, (e) => e.studio, {
    cascade: ['insert', 'update', 'remove'],
    lazy: true,
  })
  @JoinTable()
  overlays: Promise<Overlay[]> | Overlay[];

  @OneToMany(() => NoticeSound, (e) => e.studio, {
    cascade: ['insert', 'update', 'remove'],
    lazy: true,
  })
  @JoinTable()
  noticeSounds: Promise<NoticeSound[]> | NoticeSound[];

  @OneToOne(() => StickerCategory, (e) => e.studio, {
    cascade: ['insert', 'update', 'remove'],
    nullable: true,
    lazy: true,
  })
  @JoinTable()
  stickerCategory: Promise<StickerCategory | null> | StickerCategory | null;

  @OneToMany(() => StudioBan, (e) => e.studio, {
    cascade: ['insert', 'remove'],
    lazy: true,
  })
  @JoinTable()
  bans: StudioBan[];
}

@Entity()
export class Studio extends StudioRelations {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    unsigned: true,
    comment: 'PK',
  })
  readonly id: number;

  @Index()
  @NotNullColumn({
    type: 'bigint',
    unsigned: true,
    comment: 'user PK',
  })
  userId: number;

  @NotNullColumn({
    type: 'varchar',
    length: 1024,
    comment: '후원페이지 경로',
  })
  path: string;

  @CreateDateTimeColumn({
    comment: '생성일시',
  })
  createdAt: DateTime;

  @UpdateDateTimeColumn({
    comment: '수정일시',
  })
  updatedAt: DateTime;

  @BeforeInsert()
  protected beforeInsert() {
    this.createdAt = DateTime.local();
    this.updatedAt = DateTime.local();
  }
}
