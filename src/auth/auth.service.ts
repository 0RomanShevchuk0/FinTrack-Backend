import { UnauthorizedException } from '@nestjs/common/exceptions';
import { transformToDto } from 'src/utils/transform-to-dto';
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { UserResponseDto } from 'src/users/dto/user-response.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const { accessToken, refreshToken } = this.createTokens(user.id);

    return { user, accessToken, refreshToken };
  }

  async register() {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.getFullOneByEmail(email);

    if (!user) return null;

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    return isPasswordCorrect ? transformToDto(UserResponseDto, user) : null;
  }

  createTokens(userId: string) {
    const paylaod: JwtPayload = { sub: userId };

    const accessToken = this.jwtService.sign(paylaod, {
      expiresIn: '1h',
    });
    const refreshToken = this.jwtService.sign(paylaod, {
      expiresIn: '7d',
    });

    return { accessToken, refreshToken };
  }
}
