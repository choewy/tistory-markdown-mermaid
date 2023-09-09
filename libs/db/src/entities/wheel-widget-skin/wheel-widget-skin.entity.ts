import { DateTime } from 'luxon';
import { BeforeInsert, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { CreateDateTimeColumn, NotNullColumn, UpdateDateTimeColumn } from '@app/db/decorators';

import { WheelWidget } from '../wheel-widget';

export class WheelWidgetSkinRelations {
  @OneToMany(() => WheelWidget, (e) => e.skin, {
    cascade: true,
  })
  @JoinTable()
  widgets: WheelWidget[];
}

@Entity()
export class WheelWidgetSkin extends WheelWidgetSkinRelations {
  @PrimaryGeneratedColumn({
    type: 'smallint',
    unsigned: true,
    comment: 'PK',
  })
  readonly id: number;

  @NotNullColumn({
    type: 'varchar',
    length: 100,
    comment: '이름',
  })
  name: string;

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
