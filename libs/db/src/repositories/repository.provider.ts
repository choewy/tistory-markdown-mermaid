import { DataSource, Repository } from 'typeorm';

import { Type } from '@nestjs/common';

export class RepositoryProvider {
  private static provider(repository: Type<Repository<any>>) {
    return {
      inject: [DataSource],
      provide: repository,
      useFactory(dataSource: DataSource) {
        const entity = Reflect.getMetadata(repository.name, repository);
        const entityManager = dataSource.createEntityManager();

        return new Repository(entity, entityManager);
      },
    };
  }

  public static forRoot(repositories: Type<Repository<any>>[]) {
    return repositories.map(this.provider);
  }
}
