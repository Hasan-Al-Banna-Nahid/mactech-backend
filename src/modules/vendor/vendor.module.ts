import { Module } from '@nestjs/common';
import { VendorController } from './vendor.controller';
import { VendorService } from './vendor.service';
import { VendorRepository } from './vendor.repository';
import { PrismaService } from 'src/lib/prisma.service';

@Module({
  controllers: [VendorController],
  providers: [VendorService, VendorRepository, PrismaService],
  exports: [VendorService],
})
export class VendorModule {}
