// src/rental-space/rental-space.controller.ts
import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  Query,
  UseGuards,
  Req,
  UsePipes,
  Param,
  Inject,
} from '@nestjs/common';
import { RentalSpaceService } from './rental-space.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { CreateRentalSpaceSchema } from './dto/rental-space.dto';
import type {
  CreateRentalSpaceDto,
  UpdateRentalSpaceDto,
} from './dto/rental-space.dto';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { CreateResponse } from 'src/common/utils/response.util';

@Controller('rental-spaces')
export class RentalSpaceController {
  constructor(
    @Inject(RentalSpaceService)
    private readonly rentalSpaceService: RentalSpaceService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ZodValidationPipe(CreateRentalSpaceSchema))
  async create(@Req() req: any, @Body() body: CreateRentalSpaceDto) {
    const result = await this.rentalSpaceService.createSpace(
      req.user.id,
      req.user.role,
      body,
    );
    return CreateResponse(true, 'Rental space listed successfully', result);
  }

  @Get()
  async findAll(@Query('location') location: string) {
    const result = await this.rentalSpaceService.getAllSpaces(location);
    return CreateResponse(true, 'Available spaces fetched', result);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Req() req: any,
    @Param('id') id: string,
    @Body() body: UpdateRentalSpaceDto,
  ) {
    const result = await this.rentalSpaceService.updateSpace(
      req.user.id,
      id,
      body,
    );
    return CreateResponse(true, 'Rental space updated', result);
  }
}
