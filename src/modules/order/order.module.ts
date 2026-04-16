import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderRepository } from './order.repository';
import { ProduceRepository } from '../produce/produce.repository';
import { VendorRepository } from '../vendor/vendor.repository';
import { PrismaService } from 'src/lib/prisma.service';

@Module({
  controllers: [OrderController],
  providers: [
    OrderService,
    OrderRepository,
    ProduceRepository,
    VendorRepository,
    PrismaService,
  ],
})
export class OrderModule {}
