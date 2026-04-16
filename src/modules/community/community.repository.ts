import { Injectable, Inject } from '@nestjs/common';
import { PrismaService } from 'src/lib/prisma.service';
import { CreatePostDto } from './dto/community.dto';

@Injectable()
export class CommunityRepository {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async create(userId: string, data: CreatePostDto) {
    return this.prisma.communityPost.create({
      data: {
        userId,
        postContent: data.postContent,
      },
      include: { user: { select: { name: true, role: true } } },
    });
  }

  async findAll(skip: number, take: number) {
    const [data, total] = await Promise.all([
      this.prisma.communityPost.findMany({
        skip,
        take,
        orderBy: { postDate: 'desc' },
        include: { user: { select: { name: true, role: true } } },
      }),
      this.prisma.communityPost.count(),
    ]);
    return { data, total };
  }

  async findById(id: string) {
    return this.prisma.communityPost.findUnique({
      where: { id },
      include: { user: { select: { name: true } } },
    });
  }

  async delete(id: string) {
    return this.prisma.communityPost.delete({ where: { id } });
  }
}
