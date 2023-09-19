import Decimal from 'decimal.js';

import { NotNullDecimalColumn } from '@entity/decorators';

import { BaseFileEntity } from './base-file.entity';

export class SoundFileEntity extends BaseFileEntity {
  @NotNullDecimalColumn({
    precision: 8,
    scale: 3,
    comment: '길이',
    default: new Decimal(0),
  })
  duration: Decimal;
}
