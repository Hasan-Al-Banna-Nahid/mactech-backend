import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  Inject,
} from '@nestjs/common';
import { CertRepository } from './cert.repository';
import { CreateCertDto } from './dto/cert.dto';

@Injectable()
export class CertService {
  constructor(
    @Inject(CertRepository) private readonly repository: CertRepository,
  ) {}

  async addCertification(userId: string, role: string, data: CreateCertDto) {
    if (role !== 'VENDOR') {
      throw new ForbiddenException(
        'Only vendors can add sustainability certificates',
      );
    }

    const vendor = await this.repository.findVendorByUserId(userId);
    if (!vendor) {
      throw new NotFoundException(
        'Vendor profile not found. Please create a profile first.',
      );
    }

    return this.repository.create(vendor.id, data);
  }

  async getMyCertifications(userId: string) {
    const vendor = await this.repository.findVendorByUserId(userId);
    if (!vendor) throw new NotFoundException('Vendor profile not found.');

    return this.repository.findByVendorId(vendor.id);
  }
}
