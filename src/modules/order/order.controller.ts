import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { CreateResponse } from 'src/common/utils/response.util';
import { OrderService } from './order.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { CreateOrderSchema } from './dto/order.dto';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrderController {
  constructor(
    @Inject(OrderService) private readonly orderService: OrderService,
  ) {}

  @Post()
  async create(
    @Req() req: any,
    @Body(new ZodValidationPipe(CreateOrderSchema)) body: any,
  ) {
    const result = await this.orderService.placeOrder(req.user.id, body);
    return CreateResponse(true, 'Order placed successfully', result);
  }

  @Get('my-orders')
  async getMyOrders(
    @Req() req: any,
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    const result = await this.orderService.getMyOrders(
      req.user.id,
      +page || 1,
      +limit || 10,
    );
    return CreateResponse(true, 'Orders retrieved successfully', result);
  }
}
