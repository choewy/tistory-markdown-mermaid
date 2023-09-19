import { DateTime } from 'luxon';
import { BeforeInsert, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { CreateDateTimeColumn, NotNullColumn, UpdateDateTimeColumn } from '@submodule/entity/decorators';

import { NoticeSound } from './notice-sound.entity';

export class NoticeSoundCategoryRelations {
  @OneToMany(() => NoticeSound, (e) => e.category, {
    cascade: ['insert', 'update', 'remove'],
    lazy: true,
  })
  @JoinTable()
  sounds: NoticeSound[];
}

@Entity()
export class NoticeSoundCategory extends NoticeSoundCategoryRelations {
  @PrimaryGeneratedColumn({
    type: 'smallint',
    unsigned: true,
    comment: 'Pk',
  })
  readonly id: number;

  @NotNullColumn({
    type: 'varchar',
    length: 100,
    comment: '별칭',
  })
  alias: string;

  @NotNullColumn({
    type: 'smallint',
    unsigned: true,
    comment: '순서',
  })
  sequence: number;

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
