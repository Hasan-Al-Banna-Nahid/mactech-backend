// src/auth/auth.service.ts
import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  Inject,
  NotFoundException,
} from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { RegisterDto, LoginDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(AuthRepository) private readonly repository: AuthRepository,
    @Inject(JwtService) private readonly jwtService: JwtService,
  ) {}

  async registerUser(data: RegisterDto) {
    const isExist = await this.repository.findByEmail(data.email);
    if (isExist)
      throw new ConflictException('User already exists with this email');

    const hashedPassword = await bcrypt.hash(data.password, 12);
    const user = await this.repository.create({
      ...data,
      password: hashedPassword,
    });

    const accessToken = this.jwtService.sign({ id: user.id, role: user.role });
    return { user, accessToken };
  }

  async loginUser(data: LoginDto) {
    const user = await this.repository.findByEmail(data.email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isPasswordMatch = await bcrypt.compare(data.password, user.password);
    if (!isPasswordMatch)
      throw new UnauthorizedException('Invalid credentials');

    const accessToken = this.jwtService.sign({ id: user.id, role: user.role });

    // sensitive data remove kora
    const { password, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, accessToken };
  }
  async getMe(userId: string) {
    const user = await this.repository.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
