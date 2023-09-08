import { Repository } from 'typeorm';

import { InjectableDbRepository } from '@app/db/decorators';
import { User } from '@app/db/entities';

@InjectableDbRepository(User)
export class UserRepository extends Repository<User> {}
