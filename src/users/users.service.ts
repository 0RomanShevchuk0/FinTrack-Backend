import { UserResponseDto } from './dto/user-response.dto';
import { UserRepository } from './user.repository';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';
import { plainToClass } from 'class-transformer';
import { transformToDto } from 'src/utils/transform-to-dto';

@Injectable()
export class UsersService {
  constructor(private UserRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    const user = this.UserRepository.create({
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      email: createUserDto.email,
      password: hashedPassword,
    });
    return transformToDto(user, UserResponseDto);
  }

  findAll() {
    const users = this.UserRepository.findAll();
    return transformToDto(users, UserResponseDto);
  }

  findOne(id: string) {
    const user = this.UserRepository.findOneById(id);
    return transformToDto(user, UserResponseDto);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.UserRepository.update(id, {
      firstName: updateUserDto.firstName,
      lastName: updateUserDto.lastName,
      email: updateUserDto.email,
    });
  }

  remove(id: string) {
    return this.UserRepository.delete(id);
  }
}
