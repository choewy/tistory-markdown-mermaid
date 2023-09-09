import { DateTime } from 'luxon';
import { BeforeInsert, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import {
  CreateDateTimeColumn,
  NotNullBooleanColumn,
  NotNullColumn,
  NullableColumn,
  UpdateDateTimeColumn,
} from '@app/db/decorators';

import { Studio } from '../studio';
import { WheelWidgetSkin } from '../wheel-widget-skin';

export class WheelWidgetRelations {
  @ManyToOne(() => Studio, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  studio: Studio;

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
    comment: 'Studio PK',
  })
  studioId: number;

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
