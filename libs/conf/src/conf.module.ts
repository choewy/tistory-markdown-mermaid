import { Module, forwardRef } from '@nestjs/common';

import { AppConfig, CorsConfig, DbConfig } from './configs';
import { ConfService } from './conf.service';

const configs = [ConfService, AppConfig, CorsConfig, DbConfig];

@Module({
  providers: configs,
  exports: configs,
})
export class ConfLibModule {}
export const ConfLibModuleRef = forwardRef(() => ConfLibModule);
