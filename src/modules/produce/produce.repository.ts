import { Injectable, Inject } from '@nestjs/common';
import { PrismaService } from 'src/lib/prisma.service';
import { CreateProduceDto, UpdateProduceDto } from './dto/produce.dto';

@Injectable()
export class ProduceRepository {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async create(vendorId: string, data: CreateProduceDto) {
    return this.prisma.produce.create({
      data: { vendorId, ...data },
    });
  }

  async findAll(query: { category?: string; skip: number; take: number }) {
    const where = query.category ? { category: query.category } : {};

    const [data, total] = await Promise.all([
      this.prisma.produce.findMany({
        where,
        skip: query.skip,
        take: query.take,
        include: { vendor: true },
        orderBy: { id: 'desc' },
      }),
      this.prisma.produce.count({ where }),
    ]);

    return { data, total };
  }

  async findById(id: string) {
    return this.prisma.produce.findUnique({
      where: { id },
      include: { vendor: true },
    });
  }

  async update(id: string, data: UpdateProduceDto) {
    return this.prisma.produce.update({ where: { id }, data });
  }

  async delete(id: string) {
    return this.prisma.produce.delete({ where: { id } });
  }
}
