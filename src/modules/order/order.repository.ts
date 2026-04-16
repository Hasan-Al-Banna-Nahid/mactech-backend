import { Injectable, Inject } from '@nestjs/common';
import { PrismaService } from 'src/lib/prisma.service';

@Injectable()
export class OrderRepository {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async createOrder(userId: string, produce: any, quantity: number) {
    return this.prisma.$transaction(async (tx) => {
      await tx.produce.update({
        where: { id: produce.id },
        data: {
          availableQuantity: {
            decrement: quantity,
          },
        },
      });

      return tx.order.create({
        data: {
          userId: userId,
          produceId: produce.id,
          vendorId: produce.vendorId,
          status: 'PENDING',
        },
        include: {
          produce: true,
          vendor: true,
        },
      });
    });
  }

  async findMyOrders(userId: string, skip: number, take: number) {
    return this.prisma.order.findMany({
      where: { userId },
      skip,
      take,
      include: { produce: true },
      orderBy: { orderDate: 'desc' },
    });
  }
}
