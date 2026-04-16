import { Module } from '@nestjs/common';
import { CertController } from './cert.controller';
import { CertService } from './cert.service';
import { CertRepository } from './cert.repository';
import { PrismaService } from 'src/lib/prisma.service';

@Module({
  controllers: [CertController],
  providers: [CertService, CertRepository, PrismaService],
})
export class CertModule {}
