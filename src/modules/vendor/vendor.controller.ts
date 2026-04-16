// src/vendor/vendor.controller.ts
import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  UseGuards,
  Req,
  UsePipes,
  Inject,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { VendorService } from './vendor.service';
import { CreateVendorProfileSchema } from './dto/vendor.dto';
import type {
  CreateVendorProfileDto,
  UpdateVendorProfileDto,
} from './dto/vendor.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { CreateResponse } from 'src/common/utils/response.util';

@Controller('vendor')
@UseGuards(JwtAuthGuard)
export class VendorController {
  constructor(
    @Inject(VendorService) private readonly vendorService: VendorService,
  ) {}

  @Post('profile')
  @UsePipes(new ZodValidationPipe(CreateVendorProfileSchema))
  async setupProfile(@Req() req: any, @Body() body: CreateVendorProfileDto) {
    const result = await this.vendorService.createVendorProfile(
      req.user.id,
      req.user.role,
      body,
    );
    return CreateResponse(true, 'Vendor profile created successfully', result);
  }

  @Get('profile')
  async getProfile(@Req() req: any) {
    const result = await this.vendorService.getMyProfile(req.user.id);
    return CreateResponse(true, 'Vendor profile retrieved', result);
  }

  @Patch('profile')
  async updateProfile(@Req() req: any, @Body() body: UpdateVendorProfileDto) {
    const result = await this.vendorService.updateMyProfile(req.user.id, body);
    return CreateResponse(true, 'Vendor profile updated', result);
  }

  @Post('certification')
  @HttpCode(HttpStatus.CREATED)
  async addCert(
    @Req() req: any,
    @Body() body: { agency: string; date: string },
  ) {
    const result = await this.vendorService.addCertification(req.user.id, body);
    return CreateResponse(true, 'Sustainability certification added', result);
  }
}
