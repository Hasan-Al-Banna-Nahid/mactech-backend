import { Injectable, Inject } from '@nestjs/common';
import { PrismaService } from 'src/lib/prisma.service';
import {
  CreateVendorProfileDto,
  UpdateVendorProfileDto,
} from './dto/vendor.dto';

@Injectable()
export class VendorRepository {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async createProfile(userId: string, data: CreateVendorProfileDto) {
    return this.prisma.vendorProfile.create({
      data: {
        userId,
        ...data,
      },
    });
  }

  async updateProfile(userId: string, data: UpdateVendorProfileDto) {
    return this.prisma.vendorProfile.update({
      where: { userId },
      data,
    });
  }

  async findProfileByUserId(userId: string) {
    return this.prisma.vendorProfile.findUnique({
      where: { userId },
      include: {
        certifications: true,
      },
    });
  }

  async addCertification(
    vendorId: string,
    data: { agency: string; date: Date },
  ) {
    return this.prisma.sustainabilityCert.create({
      data: {
        vendorId,
        certifyingAgency: data.agency,
        certificationDate: data.date,
      },
    });
  }
}
