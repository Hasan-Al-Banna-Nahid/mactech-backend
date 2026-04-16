import {
  Injectable,
  BadRequestException,
  NotFoundException,
  Inject,
} from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { ProduceRepository } from '../produce/produce.repository';

@Injectable()
export class OrderService {
  constructor(
    @Inject(OrderRepository) private readonly repository: OrderRepository,
    @Inject(ProduceRepository) private readonly produceRepo: ProduceRepository,
  ) {}

  async placeOrder(userId: string, data: any) {
    const produce = await this.produceRepo.findById(data.produceId);
    if (!produce) throw new NotFoundException('Produce not found');

    if (produce.availableQuantity < data.quantity) {
      throw new BadRequestException('Insufficient stock available');
    }

    return this.repository.createOrder(userId, produce, data.quantity);
  }

  async getMyOrders(userId: string, page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    return this.repository.findMyOrders(userId, skip, limit);
  }
}
