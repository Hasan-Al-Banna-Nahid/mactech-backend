import { Inject, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/auth.dto';
import { PrismaService } from 'src/lib/prisma.service';

@Injectable()
export class AuthRepository {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });
  }

  async create(data: RegisterDto) {
    return this.prisma.user.create({
      data: {
        ...data,
        email: data.email.toLowerCase(),
      },
      select: { id: true, name: true, email: true, role: true, status: true },
    });
  }

  async findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        vendorProfile: true,
      },
    });
  }
}
