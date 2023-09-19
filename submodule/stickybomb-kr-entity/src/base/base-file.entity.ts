import { DateTime } from 'luxon';

import { CreateDateTimeColumn, NotNullColumn, UpdateDateTimeColumn } from '@entity/decorators';

export class BaseFileEntity {
  @NotNullColumn({
    type: 'varchar',
    length: 512,
    comment: 'CDN 경로',
  })
  path: string;

  @NotNullColumn({
    type: 'varchar',
    length: 256,
    comment: 'Mimetype',
  })
  mimetype: string;

  @NotNullColumn({
    type: 'int',
    unsigned: true,
    comment: '용량',
  })
  size: number;

  @CreateDateTimeColumn({
    comment: '생성일시',
  })
  createdAt: DateTime;

  @UpdateDateTimeColumn({
    comment: '수정일시',
  })
  updatedAt: DateTime;
}
