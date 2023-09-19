import { DateTime } from 'luxon';
import { BeforeInsert, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

import { UpdateDateTimeColumn } from 'submodule/stickybomb-kr-entity/src/decorators';
import { Overlay } from './overlay.entity';

export class OverlaySettingRelations {
  @OneToOne(() => Overlay, (e) => e.setting, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  overlay: Overlay;
}

@Entity()
export class OverlaySetting extends OverlaySettingRelations {
  @PrimaryColumn({
    type: 'bigint',
    unsigned: true,
    comment: 'Overlay PK',
  })
  overlayId: number;

  @UpdateDateTimeColumn({
    comment: '수정일시',
  })
  updatedAt: DateTime;

  @BeforeInsert()
  protected beforeInsert() {
    this.updatedAt = DateTime.local();
  }
}
