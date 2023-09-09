import { Repository } from 'typeorm';

import { InjectableDbRepository } from '@app/db/decorators';
import { UserOauth } from '@app/db/entities';

@InjectableDbRepository(UserOauth)
export class UserOauthRepository extends Repository<UserOauth> {}
