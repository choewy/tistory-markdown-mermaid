import { Injectable } from '@nestjs/common';

import { UserOauthRepository, UserRepository } from '@app/db';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userOauthRepository: UserOauthRepository,
  ) {}
}
