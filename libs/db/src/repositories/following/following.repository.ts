import { Repository } from 'typeorm';

import { InjectableDbRepository } from '@app/db/decorators';
import { Following } from '@app/db/entities';

@InjectableDbRepository(Following)
export class FollowingRepository extends Repository<Following> {}
