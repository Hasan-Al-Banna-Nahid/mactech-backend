// src/auth/auth.controller.ts
import {
  Controller,
  Post,
  Body,
  UsePipes,
  HttpStatus,
  HttpCode,
  Inject,
  Req,
  UseGuards,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterSchema, LoginSchema } from './dto/auth.dto';
import type { RegisterDto, LoginDto } from './dto/auth.dto';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { CreateResponse } from 'src/common/utils/response.util';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ZodValidationPipe(RegisterSchema))
  async register(@Body() body: RegisterDto) {
    const result = await this.authService.registerUser(body);
    return CreateResponse(true, 'User registered successfully', result);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ZodValidationPipe(LoginSchema))
  async login(@Body() body: LoginDto) {
    const result = await this.authService.loginUser(body);
    return CreateResponse(true, 'Login successful', result);
  }
  @Get('me')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async getMe(@Req() req: any) {
    const userId = req.user.id;
    const result = await this.authService.getMe(userId);

    return CreateResponse(true, 'User profile retrieved successfully', result);
  }
}
