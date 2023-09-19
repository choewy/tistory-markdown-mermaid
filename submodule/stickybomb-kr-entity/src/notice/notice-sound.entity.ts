import { DateTime } from 'luxon';
import {
  BeforeInsert,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { NotNullColumn, NullableColumn } from '@submodule/entity/decorators';
import { Studio, StudioNoticeSetting } from '@submodule/entity/studio';
import { SoundFileEntity } from '@submodule/entity/base';

import { NoticeSoundDefaultType } from './enums';
import { NoticeSoundCategory } from './notice-sound-category.entity';

export class NoticeSoundRelations extends SoundFileEntity {
  @ManyToOne(() => Studio, (e) => e.noticeSounds, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn()
  studio: Studio | null;

  @ManyToOne(() => NoticeSoundCategory, (e) => e.sounds, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  category: NoticeSoundCategory;

  @OneToMany(() => StudioNoticeSetting, (e) => e.sound, {
    cascade: ['remove'],
  })
  @JoinTable()
  noticeSettings: StudioNoticeSetting[];
}

@Entity()
export class NoticeSound extends NoticeSoundRelations {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    unsigned: true,
    comment: 'PK',
  })
  readonly id: number;

  @Index()
  @NullableColumn({
    type: 'bigint',
    unsigned: true,
    comment: 'Studio PK',
    default: null,
  })
  studioId: number | null;

  @Index()
  @NotNullColumn({
    type: 'smallint',
    unsigned: true,
    comment: 'NoticeSound Category PK',
  })
  categoryId: number;

  @NullableColumn({
    type: 'enum',
    enum: NoticeSoundDefaultType,
    default: null,
    comment: '기본 타입',
  })
  type: NoticeSoundDefaultType | null;

  @NotNullColumn({
    type: 'varchar',
    length: 100,
    comment: '별칭',
  })
  alias: string;

  @NotNullColumn({
    type: 'bigint',
    unsigned: true,
    comment: '순서',
  })
  sequence: number;

  @NotNullColumn({
    type: 'varchar',
    length: 256,
    comment: '파일명',
  })
  filename: string;

  @BeforeInsert()
  protected beforeInsert() {
    this.createdAt = DateTime.local();
    this.updatedAt = DateTime.local();
  }
}
