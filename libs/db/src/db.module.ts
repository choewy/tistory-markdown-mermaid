import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfLibModuleRef, DbConfig } from '@app/conf';

import {
  User,
  UserOauth,
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
  Goal,
  GoalDetail,
} from './entities';

const entities = [
  User,
  UserOauth,
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
  Goal,
  GoalDetail,
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
})
export class DbLibModule {}
export const DbLibModuleRef = forwardRef(() => DbLibModule);
