import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from './dto/user-response.dto';
import { UserRepository } from './user.repository';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';
import { transformToDto } from 'src/utils/transform-to-dto';

@Injectable()
export class UsersService {
  constructor(private UserRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    const user = await this.UserRepository.create({
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      email: createUserDto.email,
      password: hashedPassword,
    });

    if (!user) return null;

    return transformToDto(UserResponseDto, user);
  }

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.UserRepository.findAll();
    return plainToInstance(UserResponseDto, users, {
      excludeExtraneousValues: true,
    });
  }

  async findOneById(id: string) {
    const user = await this.UserRepository.findOneById(id);

    if (!user) return null;

    return transformToDto(UserResponseDto, user);
  }

  async getFullOneByEmail(email: string) {
    const user = await this.UserRepository.findOneByEmail(email);
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.UserRepository.update(id, {
      firstName: updateUserDto.firstName,
      lastName: updateUserDto.lastName,
      email: updateUserDto.email,
    });

    return transformToDto(UserResponseDto, user);
  }

  async remove(id: string) {
    const user = await this.UserRepository.delete(id);

    if (!user) return null;

    return transformToDto(UserResponseDto, user);
  }
}
