import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfLibModuleRef, DbConfig } from '@app/conf';

import {
  User,
  Following,
  Studio,
  Broadcast,
  PlaySetting,
  PlayDefaultSetting,
  PlayNotiSetting,
  PlayImageSetting,
  PlayRouletteSetting,
  PlayVideoSetting,
  PlaySuperStickerSetting,
  PlaySoundStickerSetting,
  PlayTtsSetting,
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
  Overlay,
  WheelWidget,
  WheelWidgetSkin,
  VideoWidget,
  NotiWidget,
  MessageWidget,
  GoalWidget,
  GoalWidgetSkin,
  RouletteWidget,
  RouletteWidgetSkin,
} from './entities';

import { FollowingRepository, RepositoryProvider, UserRepository } from './repositories';

const entities = [
  User,
  Following,
  Studio,
  Broadcast,
  PlaySetting,
  PlayDefaultSetting,
  PlayNotiSetting,
  PlayTtsSetting,
  PlayImageSetting,
  PlayRouletteSetting,
  PlayVideoSetting,
  PlaySuperStickerSetting,
  PlaySoundStickerSetting,
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
  Overlay,
  NotiWidget,
  MessageWidget,
  GoalWidget,
  GoalWidgetSkin,
  RouletteWidget,
  RouletteWidgetSkin,
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
