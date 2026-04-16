import { Module } from '@nestjs/common';
import { ProduceController } from './produce.controller';
import { ProduceService } from './produce.service';
import { ProduceRepository } from './produce.repository';
import { VendorRepository } from '../vendor/vendor.repository';
import { PrismaService } from 'src/lib/prisma.service';

@Module({
  controllers: [ProduceController],
  providers: [
    ProduceService,
    ProduceRepository,
    VendorRepository,
    PrismaService,
  ],
})
export class ProduceModule {}
