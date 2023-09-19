import Decimal from 'decimal.js';

import { NotNullDecimalColumn } from 'submodule/stickybomb-kr-entity/src/decorators';

import { BaseFileEntity } from './base-file.entity';

export class VideoFileEntity extends BaseFileEntity {
  @NotNullDecimalColumn({
    precision: 8,
    scale: 3,
    comment: '길이',
    default: new Decimal(0),
  })
  duration: Decimal;
}
