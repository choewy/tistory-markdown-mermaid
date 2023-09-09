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
  WheelDonationSetting,
  Clip,
  ClipDetail,
  ClipLike,
  ClipComment,
  ClipSetting,
  ClipAgreement,
  WheelWidget,
  WheelWidgetSkin,
  VideoWidget,
  NotiWidget,
  MessageWidget,
  GoalWidget,
  RouletteWidget,
} from './entities';

import { FollowingRepository, RepositoryProvider, UserRepository } from './repositories';

const entities = [
  User,
  Following,
  Studio,
  Broadcast,
  PlaySetting,
  DonationSetting,
  SuperStickerDonationSetting,
  VideoDonationSetting,
  WheelDonationSetting,
  Clip,
  ClipDetail,
  ClipLike,
  ClipComment,
  ClipSetting,
  ClipAgreement,
  NotiWidget,
  MessageWidget,
  GoalWidget,
  RouletteWidget,
  WheelWidget,
  WheelWidgetSkin,
  VideoWidget,
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
