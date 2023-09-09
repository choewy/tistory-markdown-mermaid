import { DateTime } from 'luxon';
import { BeforeInsert, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import {
  CreateDateTimeColumn,
  NotNullBooleanColumn,
  NotNullColumn,
  NullableColumn,
  UpdateDateTimeColumn,
} from '@app/db/decorators';

import { WheelWidgetSkin } from '../wheel-widget-skin';
import { Overlay } from '../overlay';

export class WheelWidgetRelations {
  @OneToOne(() => Overlay, (e) => e.wheel, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  overlay: Overlay;

  @ManyToOne(() => WheelWidgetSkin, (e) => e.widgets, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  skin: WheelWidgetSkin | null;
}

@Entity()
export class WheelWidget extends WheelWidgetRelations {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    unsigned: true,
    comment: 'PK',
  })
  readonly id: number;

  @NotNullColumn({
    type: 'bigint',
    unsigned: true,
    comment: 'Overlay PK',
  })
  overlayId: number;

  @NullableColumn({
    type: 'smallint',
    unsigned: true,
    comment: 'Skin PK',
    default: null,
  })
  skinId: number;

  @NotNullColumn({
    type: 'tinyint',
    unsigned: true,
    comment: '레이어 순서',
    default: 5,
  })
  layer: number;

  @NotNullColumn({
    type: 'json',
    comment: 'CSS',
  })
  css: JSON;

  @NotNullBooleanColumn({
    comment: '노출여부',
    default: true,
  })
  visible: boolean;

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
