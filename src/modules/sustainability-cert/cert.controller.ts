import {
  Controller,
  Post,
  Get,
  Body,
  Req,
  UsePipes,
  HttpStatus,
  HttpCode,
  Inject,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { CertService } from './cert.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { CreateCertSchema } from './dto/cert.dto';
import type { CreateCertDto } from './dto/cert.dto';
import { CreateResponse } from 'src/common/utils/response.util';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('sustainability-certs')
export class CertController {
  constructor(@Inject(CertService) private readonly certService: CertService) {}

  @Post()
  @Roles('ADMIN', 'VENDOR')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ZodValidationPipe(CreateCertSchema))
  async create(@Req() req: any, @Body() body: CreateCertDto) {
    const result = await this.certService.addCertification(
      req.user.id,
      req.user.role,
      body,
    );
    return CreateResponse(true, 'Certification added successfully', result);
  }

  @Get('my-certs')
  @UseGuards(JwtAuthGuard)
  async getMyCerts(@Req() req: any) {
    console.log('User from request:', req.user);

    if (!req.user || !req.user.id) {
      throw new UnauthorizedException('User identification failed');
    }

    const result = await this.certService.getMyCertifications(req.user.id);
    return CreateResponse(true, 'Certifications retrieved', result);
  }
}
