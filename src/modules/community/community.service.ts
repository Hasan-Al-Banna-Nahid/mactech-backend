import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  Inject,
} from '@nestjs/common';
import { CommunityRepository } from './community.repository';

@Injectable()
export class CommunityService {
  constructor(
    @Inject(CommunityRepository)
    private readonly repository: CommunityRepository,
  ) {}

  async createPost(userId: string, data: any) {
    return this.repository.create(userId, data);
  }

  async getPosts(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    return this.repository.findAll(skip, limit);
  }

  async deletePost(userId: string, role: string, postId: string) {
    const post = await this.repository.findById(postId);
    if (!post) throw new NotFoundException('Post not found');

    if (role !== 'ADMIN' && post.userId !== userId) {
      throw new ForbiddenException('You cannot delete someone else’s post');
    }

    return this.repository.delete(postId);
  }
}
