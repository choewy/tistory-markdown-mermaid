import { Type } from '@nestjs/common';

export const InjectableDbRepository = <T>(entity: Type<T>): ClassDecorator => {
  return (repository) => Reflect.defineMetadata(repository.name, entity, repository);
};
