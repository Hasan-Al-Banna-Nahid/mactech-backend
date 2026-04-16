import {
  Injectable,
  ForbiddenException,
  NotFoundException,
  Inject,
} from '@nestjs/common';
import { RentalSpaceRepository } from './rental-space.repository';
import { VendorRepository } from '../vendor/vendor.repository'; // Profile চেক করার জন্য
import {
  CreateRentalSpaceDto,
  UpdateRentalSpaceDto,
} from './dto/rental-space.dto';

@Injectable()
export class RentalSpaceService {
  constructor(
    @Inject(RentalSpaceRepository)
    private readonly repository: RentalSpaceRepository,
    @Inject(VendorRepository) private readonly vendorRepo: VendorRepository,
  ) {}

  async createSpace(userId: string, role: string, data: CreateRentalSpaceDto) {
    if (role !== 'VENDOR')
      throw new ForbiddenException('Only vendors can list rental spaces');

    const vendor = await this.vendorRepo.findProfileByUserId(userId);
    if (!vendor) throw new NotFoundException('Vendor profile not found');

    return this.repository.create(vendor.id, data);
  }

  async getAllSpaces(location?: string) {
    return this.repository.findAll(location);
  }

  async updateSpace(
    userId: string,
    spaceId: string,
    data: UpdateRentalSpaceDto,
  ) {
    const space = await this.repository.findById(spaceId);
    if (!space) throw new NotFoundException('Space not found');

    const vendor = await this.vendorRepo.findProfileByUserId(userId);
    if (space.vendorId !== vendor?.id)
      throw new ForbiddenException('You do not own this space');

    return this.repository.update(spaceId, data);
  }
}
