import { DateTime } from 'luxon';
import { BeforeInsert, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

import { NotNullColumn, NotNullDateTimeColumn, UpdateDateTimeColumn } from '@app/db/decorators';

import { Goal } from './goal.entity';

export class GoalDetailRelations {
  @OneToOne(() => Goal, (e) => e.detail, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  goal: Goal;
}

@Entity()
export class GoalDetail extends GoalDetailRelations {
  public static createOf(startAmount: number, targetAmount: number, startDate: DateTime, endDate: DateTime) {
    const e = new GoalDetail();

    e.start = startAmount;
    e.target = targetAmount;
    e.current = 0;
    e.startDate = startDate;
    e.endDate = endDate;

    return e;
  }

  @PrimaryColumn({
    type: 'bigint',
    unsigned: true,
    comment: 'Goal PK',
  })
  goalId: number;

  @NotNullColumn({
    type: 'int',
    unsigned: true,
    comment: '시작금액',
    default: 0,
  })
  start: number;

  @NotNullColumn({
    type: 'int',
    unsigned: true,
    comment: '목표금액',
    default: 10000,
  })
  target: number;

  @NotNullColumn({
    type: 'int',
    unsigned: true,
    comment: '누적금액',
    default: 0,
  })
  current: number;

  @NotNullDateTimeColumn({
    comment: '시작일시',
  })
  startDate: DateTime;

  @NotNullDateTimeColumn({
    comment: '종료일시',
  })
  endDate: DateTime;

  @UpdateDateTimeColumn({
    comment: '수정일시',
  })
  updatedAt: DateTime;

  @BeforeInsert()
  protected beforeInsert() {
    this.updatedAt = DateTime.local();
  }
}
