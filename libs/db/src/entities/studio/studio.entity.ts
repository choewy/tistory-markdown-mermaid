import { BeforeInsert, Entity, JoinColumn, JoinTable, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { User } from '../user';
import { CreateDateTimeColumn, NotNullColumn, NullableColumn, UpdateDateTimeColumn } from '@app/db/decorators';
import { DateTime } from 'luxon';
import { Broadcast } from '../broadcast';
import { PlaySetting } from '../play-setting';
import { ClipSetting } from '../clip-setting';
import { DonationSetting } from '../donation-setting';
import { Overlay } from '../overlay';

export class StudioMapper {
  overlaySetting: any;
}

export class StudioRelations extends StudioMapper {
  @OneToOne(() => User, (e) => e.studio, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: User;

  @OneToOne(() => Broadcast, (e) => e.studio, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  broadcast: Broadcast;

  @OneToOne(() => PlaySetting, (e) => e.studio, {
    nullable: true,
    cascade: true,
  })
  @JoinTable()
  playSetting: PlaySetting | null;

  @OneToOne(() => ClipSetting, (e) => e.studio, {
    nullable: true,
    cascade: true,
  })
  @JoinTable()
  clipSetting: ClipSetting | null;

  @OneToOne(() => DonationSetting, (e) => e.studio, {
    nullable: true,
    cascade: true,
  })
  @JoinTable()
  donationSetting: DonationSetting | null;

  @OneToMany(() => Overlay, (e) => e.studio, {
    cascade: true,
  })
  @JoinTable()
  overlays: Overlay[];

  achievements: any[];
  roulettes: any[];
  goals: any[];
}

@Entity()
export class Studio extends StudioRelations {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    unsigned: true,
    comment: 'PK',
  })
  readonly id: number;

  @NotNullColumn({
    type: 'bigint',
    unsigned: true,
    comment: 'User PK',
  })
  userId: number;

  @NotNullColumn({
    type: 'varchar',
    length: 1024,
    comment: '후원페이지 주소',
  })
  url: string;

  @NullableColumn({
    type: 'varchar',
    length: 1024,
    comment: '소개',
    default: null,
  })
  introduction: string | null;

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
