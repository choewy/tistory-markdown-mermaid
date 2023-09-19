import { NoticeSound, NoticeSoundCategory } from './notice';
import { Overlay, OverlaySetting } from './overlay';
import {
  Sticker,
  StickerCategory,
  StickerCategoryThumbnail,
  StickerImage,
  StickerThumbnail,
  StickerVideo,
} from './sticker';
import {
  Studio,
  StudioBan,
  StudioBroadcast,
  StudioDonationSetting,
  StudioNoticeSetting,
  StudioPlaySetting,
  StudioVolumeSetting,
} from './studio';
import { Tts, TtsSample, TtsThumbnail } from './tts';
import { User, UserFollow, UserImage, UserOauth, UserProfile, UserSetting, UserWallet } from './user';
import { Widget, WidgetSkin } from './widget';

export const entities = [
  User,
  UserOauth,
  UserProfile,
  UserImage,
  UserWallet,
  UserSetting,
  UserFollow,
  Studio,
  StudioBan,
  StudioBroadcast,
  StudioDonationSetting,
  StudioVolumeSetting,
  StudioPlaySetting,
  StudioNoticeSetting,
  Overlay,
  OverlaySetting,
  Widget,
  WidgetSkin,
  NoticeSound,
  NoticeSoundCategory,
  Tts,
  TtsThumbnail,
  TtsSample,
  StickerCategory,
  StickerCategoryThumbnail,
  Sticker,
  StickerThumbnail,
  StickerImage,
  StickerVideo,
];
