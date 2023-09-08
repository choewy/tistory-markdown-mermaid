import { DateTime } from 'luxon';
import { BeforeInsert, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { NotNullBooleanColumn, NotNullColumn, UpdateDateTimeColumn } from '@app/db/decorators';

import { Studio } from '../studio';

export class ClipSettingRelations {
  @OneToOne(() => Studio, (e) => e.clipSetting, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  studio: Studio;
}

@Entity()
export class ClipSetting extends ClipSettingRelations {
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

  @NotNullBooleanColumn({
    comment: '클립 생성 가능 여부',
    default: true,
  })
  active: boolean;

  @UpdateDateTimeColumn({
    comment: '수정일시',
  })
  updatedAt: DateTime;

  @BeforeInsert()
  protected beforeInsert() {
    this.updatedAt = DateTime.local();
  }
}
