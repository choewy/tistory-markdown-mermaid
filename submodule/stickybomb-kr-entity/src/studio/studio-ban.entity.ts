import { DateTime } from 'luxon';
import { BeforeInsert, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { CreateDateTimeColumn } from '@entity/decorators';
import { User } from '@entity/user';

import { Studio } from './studio.entity';

export class StudioBanRelations {
  @ManyToOne(() => Studio, (e) => e.bans, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  studio: Studio;

  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: User;

  donation: any | null;
}

@Entity()
export class StudioBan extends StudioBanRelations {
  @PrimaryColumn({
    type: 'bigint',
    unsigned: true,
    comment: 'Studio PK',
  })
  studioId: number;

  @PrimaryColumn({
    type: 'bigint',
    unsigned: true,
    comment: 'User PK',
  })
  userId: number;

  donationId: number | null;

  @CreateDateTimeColumn({
    comment: '차단일시',
  })
  createdAt: DateTime;

  @BeforeInsert()
  protected beforeInsert() {
    this.createdAt = DateTime.local();
  }
}
