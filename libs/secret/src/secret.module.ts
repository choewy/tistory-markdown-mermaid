import { Module, forwardRef } from '@nestjs/common';

import { SecretLibService } from './secret.service';
import { ConfLibModuleRef } from '@app/conf';

@Module({
  imports: [ConfLibModuleRef],
  providers: [SecretLibService],
})
export class SecretLibModule {}
export const SecretLibModuleRef = forwardRef(() => SecretLibModule);
