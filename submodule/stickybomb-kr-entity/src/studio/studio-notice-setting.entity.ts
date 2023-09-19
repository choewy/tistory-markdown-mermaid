import { DateTime } from 'luxon';
import { BeforeInsert, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

import {
  CreateDateTimeColumn,
  NotNullColumn,
  NullableColumn,
  UpdateDateTimeColumn,
} from '@submodule/entity/decorators';
import { NoticeSound } from '@submodule/entity/notice';

import { StudioNotiSettingType } from './enums';
import { Studio } from './studio.entity';

export class StudioNoticeSettingRelations {
  @ManyToOne(() => Studio, (e) => e.noticeSettings, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  studio: Studio;

  @ManyToOne(() => NoticeSound, (e) => e.noticeSettings, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn()
  sound: NoticeSound | null;
}

@Entity()
export class StudioNoticeSetting extends StudioNoticeSettingRelations {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    unsigned: true,
    comment: 'PK',
  })
  readonly Id: number;

  @PrimaryColumn({
    type: 'bigint',
    unsigned: true,
    comment: 'Studio PK',
  })
  readonly studioId: number;

  @NullableColumn({
    type: 'bigint',
    unsigned: true,
    comment: '알림음 PK',
    default: null,
  })
  soundId: number | null;

  @NotNullColumn({
    type: 'enum',
    enum: StudioNotiSettingType,
    comment: '알림 구분',
  })
  type: StudioNotiSettingType;

  @NotNullColumn({
    type: 'varchar',
    length: 256,
    comment: '메시지 텍스트',
    default: '[닉네임]님 [금액] 후원 감사합니다',
  })
  messageText: string;

  @NotNullColumn({
    type: 'varchar',
    length: 20,
    default: '나눔 고딕',
    comment: '폰트',
  })
  fontFamiliy: string;

  @NotNullColumn({
    type: 'tinyint',
    unsigned: true,
    default: 17,
    comment: '폰트 크기',
  })
  fontSize: number;

  @NotNullColumn({
    type: 'char',
    length: 7,
    default: '#ffffff',
    comment: '텍스트 색상',
  })
  fontColor: string;

  @NotNullColumn({
    type: 'char',
    length: 7,
    default: '#ffdc31',
    comment: '강조 텍스트 색상',
  })
  highlightTextColor: string;

  @NotNullColumn({
    type: 'varchar',
    length: 20,
    default: 'FADE_IN',
    comment: '등장 효과',
  })
  appearanceEffect: string;

  @NotNullColumn({
    type: 'varchar',
    length: 20,
    default: 'FADE_OUT',
    comment: '퇴장 효과',
  })
  disappearanceEffect: string;

  @NotNullColumn({
    type: 'varchar',
    length: 20,
    default: 'PULSE',
    comment: '강조 효과',
  })
  highlightEffect: string;

  @NullableColumn({
    type: 'varchar',
    length: 50,
    default: null,
    comment: '조건별칭',
  })
  alias: string | null;

  @NullableColumn({
    type: 'int',
    unsigned: true,
    default: null,
    comment: '조건값',
  })
  value: number | null;

  @NullableColumn({
    type: 'int',
    unsigned: true,
    default: null,
    comment: '우선순위',
  })
  priority: number | null;

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
