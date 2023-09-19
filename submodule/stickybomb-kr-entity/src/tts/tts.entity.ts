import { DateTime } from 'luxon';
import { BeforeInsert, Entity, JoinTable, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import {
  CreateDateTimeColumn,
  NotNullBooleanColumn,
  NotNullColumn,
  NullableDateTimeColumn,
  UpdateDateTimeColumn,
} from '@submodule/entity/decorators';

import { TtsProvider, TtsGoogleLanguage, TtsTypecastLanguage, TtsStatus } from './enums';
import { TtsSample } from './tts-sample.entity';
import { TtsThumbnail } from './tts-thumbnail.entity';

export class TtsRelations {
  @OneToOne(() => TtsThumbnail, (e) => e.tts, {
    cascade: ['insert', 'update', 'remove'],
    lazy: true,
  })
  @JoinTable()
  thumbnail: Promise<TtsThumbnail> | TtsThumbnail;

  @OneToOne(() => TtsSample, (e) => e.tts, {
    cascade: ['insert', 'update', 'remove'],
    lazy: true,
  })
  @JoinTable()
  sample: Promise<TtsSample> | TtsSample;
}

@Entity()
export class Tts extends TtsRelations {
  @PrimaryGeneratedColumn({
    type: 'smallint',
    unsigned: true,
    comment: 'PK',
  })
  readonly id: number;

  @NotNullColumn({
    type: 'enum',
    enum: TtsProvider,
    comment: '제공사',
  })
  provider: TtsProvider;

  @NotNullColumn({
    type: 'enum',
    enum: [...Object.values(TtsGoogleLanguage), ...Object.values(TtsTypecastLanguage)],
    comment: '언어',
  })
  language: TtsGoogleLanguage | TtsTypecastLanguage;

  @NotNullColumn({
    type: 'varchar',
    length: 50,
    comment: '별칭',
  })
  alias: string;

  @NotNullColumn({
    type: 'varchar',
    length: 100,
    comment: '제공사별 TTS 코드',
  })
  code: string;

  @NotNullColumn({
    type: 'varchar',
    length: 100,
    comment: '미리듣기 텍스트',
  })
  text: string;

  @NotNullColumn({
    type: 'smallint',
    unsigned: true,
    comment: '순서',
  })
  sequence: number;

  @NotNullColumn({
    type: 'int',
    unsigned: true,
    comment: '금액',
    default: 0,
  })
  price: number;

  @NotNullBooleanColumn({
    default: false,
    comment: '새 출시 여부',
  })
  isNew: boolean;

  @NotNullColumn({
    type: 'enum',
    enum: TtsStatus,
    comment: '상태',
    default: TtsStatus.DISABLED,
  })
  status: TtsStatus;

  @CreateDateTimeColumn({
    comment: '생성일시',
  })
  createdAt: DateTime;

  @UpdateDateTimeColumn({
    comment: '수정일시',
  })
  updatedAt: DateTime;

  @NullableDateTimeColumn({
    default: null,
    comment: '활성일시',
  })
  activatedAt: DateTime | null;

  @NullableDateTimeColumn({
    default: null,
    comment: '비활성일시',
  })
  disabledAt: DateTime | null;

  @NullableDateTimeColumn({
    default: null,
    comment: '삭제일시',
  })
  deletedAt: DateTime | null;

  @BeforeInsert()
  protected beforeInsert() {
    this.createdAt = DateTime.local();
    this.updatedAt = DateTime.local();
  }
}
