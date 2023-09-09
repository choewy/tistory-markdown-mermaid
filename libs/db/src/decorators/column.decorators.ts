import Decimal from 'decimal.js';
import { Column, ColumnOptions, PrimaryColumn, PrimaryColumnOptions } from 'typeorm';
import {
  BooleanColumnTransformer,
  DateColumnTransformer,
  DateTimeColumnTransformer,
  DecimalColumnTransformer,
} from './transformer.decorators';

export const NotNullColumn = (options: Omit<ColumnOptions, 'nullable'> = {}) => {
  return Column({
    ...options,
    nullable: false,
  });
};

export const NullableColumn = (options: Omit<ColumnOptions, 'nullable'> = {}) => {
  return Column({
    ...options,
    nullable: true,
    default: null,
  });
};

export const NotNullBooleanColumn = (
  options: Omit<Omit<Omit<ColumnOptions, 'type'>, 'transformer'>, 'unsigned'> = {},
) => {
  return Column({
    ...options,
    type: 'tinyint',
    unsigned: true,
    transformer: new BooleanColumnTransformer(),
  });
};

export const NullableBooleanColumn = (
  options: Omit<Omit<Omit<ColumnOptions, 'type'>, 'transformer'>, 'unsigned'> = {},
) => {
  return Column({
    ...options,
    type: 'tinyint',
    unsigned: true,
    transformer: new BooleanColumnTransformer(),
    nullable: true,
  });
};

export const NotNullDecimalColumn = (
  options: Omit<Omit<ColumnOptions, 'type'>, 'transformer'> & { fiexedPrecision?: number } = {},
) => {
  return Column({
    ...options,
    type: 'decimal',
    transformer: new DecimalColumnTransformer(
      options.fiexedPrecision,
      options.default instanceof Decimal ? options.default : new Decimal(options.default),
    ),
  });
};

export const NullableDecimalColumn = (
  options: Omit<Omit<ColumnOptions, 'type'>, 'transformer'> & { fiexedPrecision?: number } = {},
) => {
  return Column({
    ...options,
    type: 'decimal',
    transformer: new DecimalColumnTransformer(options.fiexedPrecision),
    nullable: true,
  });
};

export const PrimaryDateTimeColumn = (
  options: Omit<Omit<Omit<PrimaryColumnOptions, 'type'>, 'transformer'>, 'nullable'> = {},
) => {
  return PrimaryColumn({
    ...options,
    type: 'timestamp',
    transformer: new DateTimeColumnTransformer(),
  });
};

export const NotNullDateTimeColumn = (
  options: Omit<Omit<Omit<ColumnOptions, 'type'>, 'transformer'>, 'nullable'> = {},
) => {
  return Column({
    ...options,
    nullable: false,
    type: 'timestamp',
    transformer: new DateTimeColumnTransformer(),
  });
};

export const PrimaryDateColumn = (
  options: Omit<Omit<Omit<PrimaryColumnOptions, 'type'>, 'transformer'>, 'nullable'> = {},
) => {
  return PrimaryColumn({
    ...options,
    type: 'date',
    transformer: new DateColumnTransformer(),
  });
};

export const NotNullDateColumn = (options: Omit<Omit<Omit<ColumnOptions, 'type'>, 'transformer'>, 'nullable'> = {}) => {
  return Column({
    ...options,
    nullable: false,
    type: 'date',
    transformer: new DateColumnTransformer(),
  });
};

export const NullableDateTimeColumn = (
  options: Omit<Omit<Omit<ColumnOptions, 'type'>, 'transformer'>, 'nullable'> = {},
) => {
  return Column({
    ...options,
    nullable: true,
    type: 'datetime',
    transformer: new DateTimeColumnTransformer(),
  });
};

export const CreateDateTimeColumn = (options: Omit<Omit<ColumnOptions, 'type'>, 'transformer'> = {}) => {
  return Column({
    ...options,
    update: false,
    type: 'datetime',
    transformer: new DateTimeColumnTransformer(),
  });
};

export const UpdateDateTimeColumn = (options: Omit<Omit<ColumnOptions, 'type'>, 'transformer'> = {}) => {
  return Column({
    ...options,
    onUpdate: 'NOW()',
    type: 'datetime',
    transformer: new DateTimeColumnTransformer(),
  });
};

export const DeleteDateTimeColumn = (options: Omit<Omit<ColumnOptions, 'type'>, 'transformer'> = {}) => {
  return Column({
    ...options,
    nullable: true,
    type: 'datetime',
    transformer: new DateTimeColumnTransformer(),
  });
};
