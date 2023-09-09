import {
  CreateDateTimeColumn,
  DeleteDateTimeColumn,
  NotNullBooleanColumn,
  NotNullColumn,
  NullableDateTimeColumn,
} from '@app/db/decorators';
import { DateTime } from 'luxon';
import { BeforeInsert, Entity, JoinColumn, JoinTable, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { GoalDetail } from './goal-detail.entity';
import { Studio } from '../studio';

export class GoalRelations {
  @ManyToOne(() => Studio, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  studio: Studio;

  @OneToOne(() => GoalDetail, (e) => e.goal, {
    cascade: true,
  })
  @JoinTable()
  detail: GoalDetail;
}

@Entity()
export class Goal extends GoalRelations {
  public static createOf(
    studioId: number,
    alias: string,
    startAmount: number,
    targetAmount: number,
    startDate: DateTime,
    endDate: DateTime,
  ) {
    const goal = new Goal();

    goal.studioId = studioId;
    goal.alias = alias;
    goal.detail = GoalDetail.createOf(startAmount, targetAmount, startDate, endDate);

    return goal;
  }

  @PrimaryGeneratedColumn({
    type: 'bigint',
    unsigned: true,
    comment: 'PK',
  })
  readonly id: number;

  @NotNullColumn({
    type: 'bigint',
    unsigned: true,
    comment: 'Studio PK',
  })
  studioId: number;

  @NotNullColumn({
    type: 'varchar',
    length: 100,
    comment: '별칭',
  })
  alias: string;

  @NotNullBooleanColumn({
    comment: '적용여부',
    default: false,
  })
  active: boolean;

  @CreateDateTimeColumn({
    comment: '생성일시',
  })
  createdAt: DateTime;

  @CreateDateTimeColumn({
    comment: '수정일시',
  })
  updatedAt: DateTime;

  @DeleteDateTimeColumn({
    comment: '삭제일시',
    default: null,
  })
  deletedAt: DateTime | null;

  @NullableDateTimeColumn({
    comment: '비활성일시',
    default: null,
  })
  disabledAt: DateTime | null;

  @BeforeInsert()
  protected beforeInsert() {
    this.createdAt = DateTime.local();
    this.updatedAt = DateTime.local();
  }
}
