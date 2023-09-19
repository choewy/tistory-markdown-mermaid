import { DateTime } from 'luxon';
import { BeforeInsert, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

import { NotNullBooleanColumn, UpdateDateTimeColumn } from '@entity/decorators';

import { User } from './user.entity';

export class UserSettingRelations {
  @OneToOne(() => User, (e) => e.setting, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: User;
}

@Entity()
export class UserSetting extends UserSettingRelations {
  @PrimaryColumn({
    type: 'bigint',
    unsigned: true,
    comment: 'User PK',
  })
  readonly userId: number;

  @NotNullBooleanColumn({
    default: true,
    comment: '칭호적용여부',
  })
  isAchievementActive: boolean;

  @NotNullBooleanColumn({
    default: false,
    comment: '직원여부',
  })
  isStaff: boolean;

  @UpdateDateTimeColumn({
    comment: '수정일시',
  })
  updatedAt: DateTime;

  @BeforeInsert()
  protected beforeInsert() {
    this.updatedAt = DateTime.local();
  }
}
