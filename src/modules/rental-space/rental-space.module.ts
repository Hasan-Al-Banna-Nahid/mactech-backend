import { Module } from '@nestjs/common';
import { RentalSpaceController } from './rental-space.controller';
import { RentalSpaceService } from './rental-space.service';
import { RentalSpaceRepository } from './rental-space.repository';
import { VendorRepository } from '../vendor/vendor.repository';
import { PrismaService } from 'src/lib/prisma.service';

@Module({
  controllers: [RentalSpaceController],
  providers: [
    RentalSpaceService,
    RentalSpaceRepository,
    VendorRepository,
    PrismaService,
  ],
})
export class RentalSpaceModule {}
