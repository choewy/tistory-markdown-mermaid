import Decimal from 'decimal.js';

import { DateTime } from 'luxon';
import { BeforeInsert, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

import { NotNullColumn, NotNullDecimalColumn, UpdateDateTimeColumn } from '@submodule/entity/decorators';

import { User } from './user.entity';

export class UserWalletRelations {
  @OneToOne(() => User, (e) => e.wallet, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: User;
}

@Entity()
export class UserWallet extends UserWalletRelations {
  @PrimaryColumn({
    type: 'bigint',
    unsigned: true,
    comment: 'User PK',
  })
  readonly userId: number;

  @NotNullColumn({
    type: 'int',
    unsigned: true,
    default: 0,
    comment: '캐쉬',
  })
  cash: number;

  @NotNullDecimalColumn({
    precision: 6,
    scale: 4,
    unsigned: true,
    default: new Decimal(0),
    comment: '캐시충전 수수료',
  })
  fee: Decimal;

  @UpdateDateTimeColumn({
    comment: '수정일시',
  })
  updatedAt: DateTime;

  @BeforeInsert()
  protected beforeInsert() {
    this.updatedAt = DateTime.local();
  }
}
