import { DateTime } from 'luxon';
import { BeforeInsert, Entity, PrimaryGeneratedColumn } from 'typeorm';

import {
  CreateDateTimeColumn,
  NotNullColumn,
  UpdateDateTimeColumn,
} from 'submodule/stickybomb-kr-entity/src/decorators';
import { WidgetType } from './enums';

export class WidgetSkinRelations {}

@Entity()
export class WidgetSkin extends WidgetSkinRelations {
  @PrimaryGeneratedColumn({
    type: 'smallint',
    unsigned: true,
    comment: 'PK',
  })
  readonly id: number;

  @NotNullColumn({
    type: 'enum',
    enum: WidgetType,
    comment: '위젯 종류',
  })
  type: WidgetType;

  @CreateDateTimeColumn({
    comment: '등록일시',
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
