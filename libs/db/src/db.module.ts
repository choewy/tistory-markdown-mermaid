import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfLibModuleRef, DbConfig } from '@app/conf';

import {
  Broadcast,
  Studio,
  Following,
  User,
  PlaySetting,
  DonationSetting,
  SuperStickerDonationSetting,
  VideoDonationSetting,
  ClipSetting,
  WheelDonationSetting,
} from './entities';
import { FollowingRepository, RepositoryProvider, UserRepository } from './repositories';

const entities = [
  User,
  Following,
  Studio,
  Broadcast,
  ClipSetting,
  PlaySetting,
  DonationSetting,
  SuperStickerDonationSetting,
  VideoDonationSetting,
  WheelDonationSetting,
];
const repositoryProvider = RepositoryProvider.forRoot([UserRepository, FollowingRepository]);

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
