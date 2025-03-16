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
    return transformToDto(user, UserResponseDto);
  }

  async findAll() {
    const users = await this.UserRepository.findAll();
    return transformToDto(users, UserResponseDto);
  }

  async findOne(id: string) {
    const user = await this.UserRepository.findOneById(id);
    return transformToDto(user, UserResponseDto);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.UserRepository.update(id, {
      firstName: updateUserDto.firstName,
      lastName: updateUserDto.lastName,
      email: updateUserDto.email,
    });

    return transformToDto(user, UserResponseDto);
  }

  async remove(id: string) {
    const user = await this.UserRepository.delete(id);
    return transformToDto(user, UserResponseDto);
  }
}
