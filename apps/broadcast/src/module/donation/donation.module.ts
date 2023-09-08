import { Module, forwardRef } from '@nestjs/common';
import { DonationListener } from './donation.linstener';
import { DbLibModuleRef } from '@app/db';

@Module({
  imports: [DbLibModuleRef],
  providers: [DonationListener],
})
export class DonationModule {}
export const DonationModuleRef = forwardRef(() => DonationModule);
