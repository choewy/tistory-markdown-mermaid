import { BeforeInsert, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ContentTemplate } from '../content-template';
import { CreateDateTimeColumn, NotNullBooleanColumn, NotNullColumn, UpdateDateTimeColumn } from '@app/db/decorators';
import { DateTime } from 'luxon';

export class SkinRelations {
  @ManyToOne(() => ContentTemplate, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  contentTemplate: ContentTemplate;
  widgets: any[];
}

@Entity()
export class Skin extends SkinRelations {
  @PrimaryGeneratedColumn({
    type: 'smallint',
    unsigned: true,
    comment: 'PK',
  })
  readonly id: number;

  @NotNullColumn({
    type: 'smallint',
    unsigned: true,
    comment: 'ContentTemplate PK',
  })
  contentTemplateId: number;

  @NotNullColumn({
    type: 'smallint',
    unsigned: true,
    comment: '순서',
  })
  sequence: number;

  @NotNullColumn({
    type: 'varchar',
    length: 100,
    comment: '코드',
  })
  code: string;

  @NotNullColumn({
    type: 'varchar',
    length: 100,
    comment: '이름',
  })
  name: string;

  @NotNullBooleanColumn({
    comment: '기본 설정 여부',
    default: false,
  })
  isDefault: boolean;

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
