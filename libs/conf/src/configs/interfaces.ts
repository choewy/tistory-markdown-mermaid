import { Geometry } from 'typeorm';

export interface TypeOrmTypeCastField {
  type: string;
  length: number;
  db: string;
  table: string;
  name: string;
  string(): string;
  buffer(): Buffer;
  geometry(): Geometry;
}
