import { DateTime } from 'luxon';
import { BeforeInsert, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

import { CreateDateTimeColumn } from '@app/db/decorators';

import { User } from '../user';

export class ClipAgreementRelations {
  @OneToOne(() => User, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  creator: User;
}

@Entity()
export class ClipAgreement extends ClipAgreementRelations {
  @PrimaryColumn({
    type: 'bigint',
    unsigned: true,
    comment: 'Creator PK',
  })
  creatorId: number;

  @CreateDateTimeColumn({
    comment: '동의일시',
  })
  createdAt: DateTime;

  @BeforeInsert()
  protected beforeInsert() {
    this.createdAt = DateTime.local();
  }
}
