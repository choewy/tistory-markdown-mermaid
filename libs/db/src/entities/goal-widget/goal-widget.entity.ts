import { DateTime } from 'luxon';
import { BeforeInsert, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { CreateDateTimeColumn, NotNullBooleanColumn, NotNullColumn, UpdateDateTimeColumn } from '@app/db/decorators';

import { Studio } from '../studio';
import { GoalWidgetSkin } from '../goal-widget-skin';

export class GoalWidgetRelations {
  @ManyToOne(() => Studio, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  studio: Studio;

  @ManyToOne(() => GoalWidgetSkin, (e) => e.widgets, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  skin: GoalWidgetSkin | null;

  /** @todo */
  goal: any;
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
    comment: 'Studio PK',
  })
  studioId: number;

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
