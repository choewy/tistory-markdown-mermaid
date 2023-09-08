import { Module } from '@nestjs/common';

import { ServiceQueueModule } from './queue';

@Module({
  imports: [ServiceQueueModule],
})
export class CoreModule {}
