import Decimal from 'decimal.js';
import { DateTime } from 'luxon';

import { FindOperator, ValueTransformer } from 'typeorm';

export class DecimalColumnTransformer implements ValueTransformer {
  constructor(private readonly precision?: number) {}

  to(value: Decimal | FindOperator<Decimal> | null): string | FindOperator<Decimal> | null {
    if (value == null) {
      return null;
    }

    if (value instanceof FindOperator) {
      return value;
    }

    return value.toFixed(this.precision);
  }

  from(value: string | null): Decimal | null {
    if (value == null) {
      return null;
    }

    return new Decimal(value);
  }
}

export class DateTimeColumnTransformer implements ValueTransformer {
  to(value: DateTime | FindOperator<DateTime> | null): string | FindOperator<DateTime> | null {
    if (value instanceof FindOperator) {
      return value;
    } else if (value == null) {
      return null;
    }

    return value.toSQL({ includeOffset: false });
  }

  from(value: DateTime | null): DateTime | null {
    return value;
  }
}

export class DateColumnTransformer implements ValueTransformer {
  to(value: DateTime | FindOperator<DateTime> | null): string | FindOperator<DateTime> | null {
    if (value instanceof FindOperator) {
      return value;
    } else if (value == null) {
      return null;
    }

    return value.toSQLDate();
  }

  from(value: DateTime | null): DateTime | null {
    return value;
  }
}

export class BooleanColumnTransformer implements ValueTransformer {
  to(value: boolean | FindOperator<boolean> | null): number | FindOperator<boolean> {
    if (value == null) {
      return;
    }

    return value ? 1 : 0;
  }

  from(value: 1 | 0 | null): boolean {
    return !!value;
  }
}
