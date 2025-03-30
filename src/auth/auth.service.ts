import {
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common/exceptions';
import { transformToDto } from 'src/utils/transform-to-dto';
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { UserResponseDto } from 'src/users/dto/user-response.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { RegisterDto } from './dto/register.dto';
import { Response } from 'express';

@Injectable()
export class AuthService {
  REFRESH_TOKEN_NAME = 'refreshToken';
  EXPIRE_DAY_REFRESH_TOKEN = 14;

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

  async register(data: RegisterDto) {
    const user = await this.usersService.create({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    });

    if (!user) {
      throw new BadRequestException('User registration failed');
    }

    const { accessToken, refreshToken } = this.createTokens(user.id);

    return { user, accessToken, refreshToken };
  }

  async refresh(refreshToken: string) {
    const result = await this.jwtService.verifyAsync<JwtPayload>(refreshToken);
    if (!result) throw new UnauthorizedException('Invalid refresh token');

    const user = await this.usersService.findOneById(result.sub);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const { accessToken } = this.createTokens(user.id);

    return { user, accessToken };
  }

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
      expiresIn: `${this.EXPIRE_DAY_REFRESH_TOKEN}d`,
    });

    return { accessToken, refreshToken };
  }

  addRefreshTokenToResponse(res: Response, refreshToken: string) {
    const expiresIn = new Date();
    expiresIn.setDate(expiresIn.getDate() + this.EXPIRE_DAY_REFRESH_TOKEN);

    res.cookie(this.REFRESH_TOKEN_NAME, refreshToken, {
      httpOnly: true,
      expires: expiresIn,
      secure: true,
      sameSite: process.env.NODE_ENV === 'production' ? 'lax' : 'none',
    });
  }

  removeRefreshTokenFromResponse(res: Response) {
    res.cookie(this.REFRESH_TOKEN_NAME, '', {
      httpOnly: true,
      expires: new Date(0),
      secure: true,
      sameSite: process.env.NODE_ENV === 'production' ? 'lax' : 'none',
    });
  }
}
