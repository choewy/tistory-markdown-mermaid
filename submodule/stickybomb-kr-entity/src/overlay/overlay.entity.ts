import { DateTime } from 'luxon';
import {
  BeforeInsert,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import {
  CreateDateTimeColumn,
  NotNullColumn,
  UpdateDateTimeColumn,
} from 'submodule/stickybomb-kr-entity/src/decorators';
import { Studio } from 'submodule/stickybomb-kr-entity/src/studio';
import { Widget } from 'submodule/stickybomb-kr-entity/src/widget';

import { OverlaySetting } from './overlay-setting.entity';

export class OverlayRelations {
  @ManyToOne(() => Studio, (e) => e.overlays, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  studio: Studio;

  @OneToOne(() => OverlaySetting, (e) => e.overlay, {
    cascade: ['insert', 'update', 'remove'],
    lazy: true,
  })
  @JoinTable()
  setting: Promise<OverlaySetting> | OverlaySetting;

  @OneToMany(() => Widget, (e) => e.overlay, {
    cascade: ['insert', 'update', 'remove'],
    lazy: true,
  })
  @JoinTable()
  widgets: Promise<Widget[]> | Widget[];
}

@Entity()
export class Overlay extends OverlayRelations {
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
    length: 50,
    comment: '별칭',
  })
  alias: string;

  @NotNullColumn({
    type: 'varchar',
    length: 100,
    comment: 'path',
  })
  path: string;

  @CreateDateTimeColumn({
    comment: '생성일시',
  })
  createdAt: DateTime;

  @UpdateDateTimeColumn({
    comment: '수정일시',
  })
  updatedAt: DateTime;

  @BeforeInsert()
  protected beforeInsert() {
    this.createdAt = DateTime.local();
    this.updatedAt = DateTime.local();
  }
}
