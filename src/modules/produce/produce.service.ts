import {
  Injectable,
  ForbiddenException,
  NotFoundException,
  Inject,
} from '@nestjs/common';
import { ProduceRepository } from './produce.repository';
import { VendorRepository } from '../vendor/vendor.repository';
import { UpdateProduceDto } from './dto/produce.dto';

@Injectable()
export class ProduceService {
  constructor(
    @Inject(ProduceRepository) private readonly repository: ProduceRepository,
    @Inject(VendorRepository) private readonly vendorRepo: VendorRepository,
  ) {}

  async addProduce(userId: string, role: string, data: any) {
    if (role !== 'VENDOR')
      throw new ForbiddenException('Only vendors can list produce');

    const vendor = await this.vendorRepo.findProfileByUserId(userId);
    if (!vendor) throw new NotFoundException('Vendor profile not found');

    return this.repository.create(vendor.id, data);
  }

  async getMarketplace(
    category?: string,
    page: number = 1,
    limit: number = 10,
  ) {
    const skip = (page - 1) * limit;
    return this.repository.findAll({ category, skip, take: limit });
  }

  async getSingleProduce(id: string) {
    const produce = await this.repository.findById(id);
    if (!produce) throw new NotFoundException('Product not found');
    return produce;
  }

  async updateProduce(
    userId: string,
    produceId: string,
    data: UpdateProduceDto,
  ) {
    const produce = await this.getSingleProduce(produceId);

    const vendor = await this.vendorRepo.findProfileByUserId(userId);
    if (produce.vendorId !== vendor?.id) {
      throw new ForbiddenException(
        'You are not authorized to update this product',
      );
    }

    return this.repository.update(produceId, data);
  }

  async deleteProduce(userId: string, produceId: string) {
    const produce = await this.getSingleProduce(produceId);

    const vendor = await this.vendorRepo.findProfileByUserId(userId);
    if (produce.vendorId !== vendor?.id) {
      throw new ForbiddenException(
        'You are not authorized to delete this product',
      );
    }

    return this.repository.delete(produceId);
  }
}
