import { Module } from '@nestjs/common';

import { RepositoryProvider, UserOauthRepository, UserRepository } from '@app/db';
import { OauthLibModule } from '@app/oauth';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [OauthLibModule],
  controllers: [AuthController],
  providers: [...RepositoryProvider.forFeature([UserRepository, UserOauthRepository]), AuthService],
})
export class AuthModule {}
