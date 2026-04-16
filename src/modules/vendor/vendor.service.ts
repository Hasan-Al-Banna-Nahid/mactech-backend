import {
  Injectable,
  ConflictException,
  ForbiddenException,
  NotFoundException,
  Inject,
} from '@nestjs/common';
import { VendorRepository } from './vendor.repository';
import {
  CreateVendorProfileDto,
  UpdateVendorProfileDto,
} from './dto/vendor.dto';

@Injectable()
export class VendorService {
  constructor(
    @Inject(VendorRepository) private readonly repository: VendorRepository,
  ) {}

  async createVendorProfile(
    userId: string,
    userRole: string,
    data: CreateVendorProfileDto,
  ) {
    if (userRole !== 'VENDOR') {
      throw new ForbiddenException(
        'Only users with VENDOR role can create a farm profile',
      );
    }

    const existingProfile = await this.repository.findProfileByUserId(userId);
    if (existingProfile) {
      throw new ConflictException(
        'Vendor profile already exists for this user',
      );
    }

    return this.repository.createProfile(userId, data);
  }

  async getMyProfile(userId: string) {
    const profile = await this.repository.findProfileByUserId(userId);
    if (!profile) throw new NotFoundException('Vendor profile not found');
    return profile;
  }

  async updateMyProfile(userId: string, data: UpdateVendorProfileDto) {
    await this.getMyProfile(userId);
    return this.repository.updateProfile(userId, data);
  }

  async addCertification(
    userId: string,
    data: { agency: string; date: string },
  ) {
    const vendor = await this.repository.findProfileByUserId(userId);

    if (!vendor) {
      throw new NotFoundException('Vendor profile not found.');
    }

    return this.repository.addCertification(vendor.id, {
      agency: data.agency,
      date: new Date(data.date),
    });
  }
}
