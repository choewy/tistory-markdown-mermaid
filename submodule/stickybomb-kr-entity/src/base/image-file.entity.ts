import { NotNullColumn } from '@submodule/entity/decorators';

import { BaseFileEntity } from './base-file.entity';

export class ImageFileEntity extends BaseFileEntity {
  @NotNullColumn({
    type: 'smallint',
    unsigned: true,
    comment: '폭',
  })
  width: number;

  @NotNullColumn({
    type: 'smallint',
    unsigned: true,
    comment: '높이',
  })
  height: number;
}
