import { Repository } from 'typeorm';

import { InjectableDbRepository } from '@app/db/decorators';
import { Goal } from '@app/db/entities';

@InjectableDbRepository(Goal)
export class GoalRepository extends Repository<Goal> {}
