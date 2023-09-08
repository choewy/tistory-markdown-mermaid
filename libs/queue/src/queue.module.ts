import { Module, forwardRef } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';

import { ConfLibModuleRef, RedisConfig } from '@app/conf';

@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [ConfLibModuleRef],
      inject: [RedisConfig],
      useFactory(config: RedisConfig) {
        return config.getBullOptions();
      },
    }),
  ],
})
export class QueueLibModule {}
export const QueueLibModuleRef = forwardRef(() => QueueLibModule);
