import { Repository } from 'typeorm';

import { InjectableDbRepository } from '@app/db/decorators';
import { GoalDetail } from '@app/db/entities';

@InjectableDbRepository(GoalDetail)
export class GoalDetailRepository extends Repository<GoalDetail> {}
