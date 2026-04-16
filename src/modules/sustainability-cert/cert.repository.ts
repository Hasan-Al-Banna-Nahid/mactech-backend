import { Injectable, Inject } from '@nestjs/common';
import { PrismaService } from 'src/lib/prisma.service';
import { CreateCertDto } from './dto/cert.dto';

@Injectable()
export class CertRepository {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async create(vendorId: string, data: CreateCertDto) {
    return this.prisma.sustainabilityCert.create({
      data: {
        vendorId,
        certifyingAgency: data.certifyingAgency,
        certificationDate: new Date(data.certificationDate),
      },
    });
  }

  async findByVendorId(vendorId: string) {
    return this.prisma.sustainabilityCert.findMany({
      where: { vendorId },
    });
  }

  async findVendorByUserId(userId: string) {
    return this.prisma.vendorProfile.findUnique({
      where: { userId },
    });
  }
}
