export class EventQueue<T = any> {
  public static makeOf<T = any>(event: string, body: T) {
    return new EventQueue(event, body);
  }

  constructor(public readonly event: string, public readonly body: T) {}
}

export class UpdateBroadcastSettingQueue {
  public static readonly NAME = 'broadcast-setting-update';
  public static readonly EVENT = 'broadcast-setting.update';

  public static bodyOf(channelId: number) {
    return new UpdateBroadcastSettingQueue(channelId);
  }

  constructor(readonly channelId: number) {}
}

export class RegistTemplateDonationQueue {
  public static readonly NAME = 'template-donation-regist';
  public static readonly EVENT = 'template-donation.regist';

  public static bodyOf(channelId: number, donationId: number) {
    return new RegistTemplateDonationQueue(channelId, donationId);
  }

  constructor(readonly channelId: number, readonly donationId: number) {}
}
