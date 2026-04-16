import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Query,
  UseGuards,
  Req,
  Param,
  UsePipes,
  Inject,
} from '@nestjs/common';
import { CommunityService } from './community.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { CreatePostSchema } from './dto/community.dto';
import { CreateResponse } from 'src/common/utils/response.util';

@Controller('community')
export class CommunityController {
  constructor(
    @Inject(CommunityService) private readonly service: CommunityService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Req() req: any,
    @Body(new ZodValidationPipe(CreatePostSchema)) body: any,
  ) {
    const result = await this.service.createPost(req.user.id, body);
    return CreateResponse(true, 'Post shared in community', result);
  }

  @Get()
  async getAll(@Query('page') page: string, @Query('limit') limit: string) {
    const result = await this.service.getPosts(+page || 1, +limit || 10);
    return CreateResponse(true, 'Community posts retrieved', result);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Req() req: any, @Param('id') id: string) {
    await this.service.deletePost(req.user.id, req.user.role, id);
    return CreateResponse(true, 'Post deleted successfully', null);
  }
}
