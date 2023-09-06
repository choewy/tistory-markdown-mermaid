import { Module, forwardRef } from '@nestjs/common';
import { DbService } from './db.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfModuleRef, DbConfig } from '@app/conf';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfModuleRef],
      inject: [DbConfig],
      useFactory(dbConfig: DbConfig) {
        return dbConfig.getOptions();
      },
    }),
  ],
  providers: [DbService],
  exports: [DbService],
})
export class DbLibModule {}
export const DbLibModuleRef = forwardRef(() => DbLibModule);
