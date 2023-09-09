import { DateTime } from 'luxon';
import { BeforeInsert, Entity, JoinColumn, JoinTable, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { CreateDateTimeColumn, NotNullColumn, UpdateDateTimeColumn } from '@app/db/decorators';

import { Studio } from '../studio';
import { GoalWidget } from '../goal-widget';
import { NotiWidget } from '../noti-widget';
import { WheelWidget } from '../wheel-widget';
import { RouletteWidget } from '../roulette-widget';
import { VideoWidget } from '../video-widget';
import { MessageWidget } from '../message-widget';

export class OverlayRelations {
  @ManyToOne(() => Studio, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  studio: Studio;

  @OneToOne(() => NotiWidget, {
    cascade: true,
  })
  @JoinTable()
  noti: NotiWidget;

  @OneToOne(() => MessageWidget, {
    cascade: true,
  })
  @JoinTable()
  message: MessageWidget;

  @OneToOne(() => GoalWidget, {
    cascade: true,
  })
  @JoinTable()
  goal: GoalWidget;

  @OneToOne(() => RouletteWidget, {
    cascade: true,
  })
  @JoinTable()
  roulette: RouletteWidget;

  @OneToOne(() => WheelWidget, {
    cascade: true,
  })
  @JoinTable()
  wheel: WheelWidget;

  @OneToOne(() => VideoWidget, {
    cascade: true,
  })
  @JoinTable()
  video: VideoWidget;
}

@Entity()
export class Overlay extends OverlayRelations {
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
    type: 'varchar',
    length: '50',
    comment: '별칭',
  })
  alias: string;

  @NotNullColumn({
    type: 'varchar',
    length: '1024',
    comment: 'URL',
  })
  url: string;

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
