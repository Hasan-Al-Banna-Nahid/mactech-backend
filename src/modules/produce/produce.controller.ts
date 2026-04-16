import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ProduceService } from './produce.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { CreateResponse } from 'src/common/utils/response.util';
import { UpdateProduceSchema } from './dto/produce.dto';
import type { UpdateProduceDto } from './dto/produce.dto';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';

@Controller('produce')
export class ProduceController {
  constructor(
    @Inject(ProduceService) private readonly produceService: ProduceService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Req() req: any, @Body() body: any) {
    const result = await this.produceService.addProduce(
      req.user.id,
      req.user.role,
      body,
    );
    return CreateResponse(true, 'Product listed successfully', result);
  }

  @Get()
  async getAll(
    @Query('category') category: string,
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    const result = await this.produceService.getMarketplace(
      category,
      +page || 1,
      +limit || 10,
    );
    return CreateResponse(true, 'Products fetched', result);
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    const result = await this.produceService.getSingleProduce(id);
    return CreateResponse(true, 'Product details retrieved', result);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Req() req: any,
    @Param('id') id: string,
    @Body() body: UpdateProduceDto,
  ) {
    const result = await this.produceService.updateProduce(
      req.user.id,
      id,
      body,
    );
    return CreateResponse(true, 'Product updated successfully', result);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Req() req: any, @Param('id') id: string) {
    await this.produceService.deleteProduce(req.user.id, id);
    return CreateResponse(true, 'Product deleted successfully', null);
  }
}
