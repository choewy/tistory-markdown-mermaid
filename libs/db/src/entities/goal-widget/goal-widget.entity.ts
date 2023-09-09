import { DateTime } from 'luxon';
import { BeforeInsert, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { CreateDateTimeColumn, NotNullBooleanColumn, NotNullColumn, UpdateDateTimeColumn } from '@app/db/decorators';

import { Overlay } from '../overlay';
import { Goal } from '../goal';
import { GoalWidgetSkin } from '../goal-widget-skin';

export class GoalWidgetMapper {
  goal: Goal | null;
}

export class GoalWidgetRelations extends GoalWidgetMapper {
  @OneToOne(() => Overlay, (e) => e.message, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  overlay: Overlay;

  @ManyToOne(() => GoalWidgetSkin, (e) => e.widgets, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  skin: GoalWidgetSkin | null;
}

@Entity()
export class GoalWidget extends GoalWidgetRelations {
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

  @NotNullColumn({
    type: 'char',
    length: 7,
    comment: '바 색상',
    default: '#ffffff',
  })
  barColor: string;

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
