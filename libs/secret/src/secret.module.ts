import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { SecretLibService } from './secret.service';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [SecretLibService],
})
export class SecretLibModule {}
export const SecretLibModuleRef = forwardRef(() => SecretLibModule);
