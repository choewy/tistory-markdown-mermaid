import { DateTime } from 'luxon';
import { BeforeInsert, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { NullableColumn, UpdateDateTimeColumn } from '@submodule/entity/decorators';

import { StudioBroadcastPlatform } from './enums';
import { Studio } from './studio.entity';

export class StudioBroadcastRelations {
  @ManyToOne(() => Studio, (e) => e.broadcasts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  studio: Studio;
}

@Entity()
export class StudioBroadcast extends StudioBroadcastRelations {
  @PrimaryColumn({
    type: 'bigint',
    unsigned: true,
    comment: 'Studio PK',
  })
  readonly studioId: number;

  @PrimaryColumn({
    type: 'enum',
    enum: StudioBroadcastPlatform,
    comment: '방송 플랫폼',
  })
  platform: StudioBroadcastPlatform;

  @NullableColumn({
    type: 'varchar',
    length: 100,
  })
  title: string;

  @NullableColumn({
    type: 'varchar',
    length: 512,
  })
  url: string;

  @NullableColumn({
    type: 'varchar',
    length: 256,
  })
  introduction: string;

  @UpdateDateTimeColumn({
    comment: '수정일시',
  })
  updatedAt: DateTime;

  @BeforeInsert()
  protected beforeInsert() {
    this.updatedAt = DateTime.local();
  }
}
