import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Overlay {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    unsigned: true,
    comment: 'PK',
  })
  readonly id: number;
}
