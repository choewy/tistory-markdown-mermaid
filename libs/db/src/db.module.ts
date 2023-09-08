import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfLibModuleRef, DbConfig } from '@app/conf';

import { User } from './entities';
import { RepositoryProvider, UserRepository } from './repositories';

const entities = [User];
const repositoryProvider = RepositoryProvider.forRoot([UserRepository]);

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfLibModuleRef],
      inject: [DbConfig],
      useFactory(config: DbConfig) {
        return config.getOptions(entities);
      },
    }),
  ],
  providers: repositoryProvider,
  exports: repositoryProvider,
})
export class DbLibModule {}
export const DbLibModuleRef = forwardRef(() => DbLibModule);
