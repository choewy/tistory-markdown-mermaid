import { Module } from '@nestjs/common';

import { ConfLibModule } from '@app/conf';
import { DbLibModule } from '@app/db';

@Module({
  imports: [ConfLibModule, DbLibModule],
})
export class RootModule {}
