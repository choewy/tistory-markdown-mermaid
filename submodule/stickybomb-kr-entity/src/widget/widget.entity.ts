import { DateTime } from 'luxon';
import { BeforeInsert, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { NotNullColumn, UpdateDateTimeColumn } from '@entity/decorators';
import { Overlay } from '@entity/overlay';

import { WidgetType } from './enums';

export class WidgetRelations {
  @ManyToOne(() => Overlay, (e) => e.widgets, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  overlay: Overlay;
}

@Entity()
export class Widget extends WidgetRelations {
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
    comment: 'Overlay PK',
  })
  overlayId: number;

  @NotNullColumn({
    type: 'enum',
    enum: WidgetType,
    comment: '유형',
  })
  type: WidgetType;

  @UpdateDateTimeColumn({
    comment: '수정일시',
  })
  updatedAt: DateTime;

  @BeforeInsert()
  protected beforeInsert() {
    this.updatedAt = DateTime.local();
  }
}
