import { Injectable, Inject } from '@nestjs/common';
import { PrismaService } from 'src/lib/prisma.service';
import {
  CreateRentalSpaceDto,
  UpdateRentalSpaceDto,
} from './dto/rental-space.dto';

@Injectable()
export class RentalSpaceRepository {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async create(vendorId: string, data: CreateRentalSpaceDto) {
    return this.prisma.rentalSpace.create({
      data: { vendorId, ...data },
    });
  }

  async findAll(searchTerm?: string) {
    return this.prisma.rentalSpace.findMany({
      where: {
        availability: true,
        OR: searchTerm
          ? [
              { location: { contains: searchTerm, mode: 'insensitive' } },
              { size: { contains: searchTerm, mode: 'insensitive' } },
            ]
          : undefined,
      },
      include: { vendor: true },
    });
  }

  async findById(id: string) {
    return this.prisma.rentalSpace.findUnique({ where: { id } });
  }

  async update(id: string, data: UpdateRentalSpaceDto) {
    return this.prisma.rentalSpace.update({ where: { id }, data });
  }

  async delete(id: string) {
    return this.prisma.rentalSpace.delete({ where: { id } });
  }
}
