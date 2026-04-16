import { Module } from '@nestjs/common';
import { CommunityController } from './community.controller';
import { CommunityService } from './community.service';
import { CommunityRepository } from './community.repository';
import { PrismaService } from 'src/lib/prisma.service';

@Module({
  controllers: [CommunityController],
  providers: [CommunityService, CommunityRepository, PrismaService],
})
export class CommunityModule {}
