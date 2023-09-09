import { DateTime } from 'luxon';
import { BeforeInsert, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { CreateDateTimeColumn, NotNullColumn, UpdateDateTimeColumn } from '@app/db/decorators';
import { ContentTemplateCode } from './enums';
import { Skin } from '../skin';

export class ContentTemplateRelations {
  @OneToMany(() => Skin, (e) => e.contentTemplate, {
    cascade: true,
  })
  @JoinTable()
  skins: Skin[];
}

@Entity()
export class ContentTemplate extends ContentTemplateRelations {
  @PrimaryGeneratedColumn({
    type: 'smallint',
    unsigned: true,
    comment: 'PK',
  })
  readonly id: number;

  @NotNullColumn({
    type: 'enum',
    enum: ContentTemplateCode,
    comment: '코드',
  })
  code: ContentTemplateCode;

  @NotNullColumn({
    type: 'varchar',
    length: 50,
    comment: '이름',
  })
  name: string;

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
