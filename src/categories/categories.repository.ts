import { PrismaService } from 'src/prisma.service';
import { Injectable } from '@nestjs/common';
import { Category } from '@prisma/client';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesRepository {
  constructor(private prisma: PrismaService) {}

  async findAllForUser(userId: string): Promise<Category[]> {
    return this.prisma.category.findMany({ where: { user_id: userId } });
  }

  async findOneByIdForUser(
    id: string,
    userId: string,
  ): Promise<Category | null> {
    return this.prisma.category.findUnique({ where: { id, user_id: userId } });
  }

  async createForUser(
    createCategoryDto: CreateCategoryDto,
    userId: string,
  ): Promise<Category | null> {
    return this.prisma.category.create({
      data: { ...createCategoryDto, user_id: userId },
    });
  }

  async updateForUser(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
    userId: string,
  ) {
    return this.prisma.category.update({
      where: { id, user_id: userId },
      data: updateCategoryDto,
    });
  }

  async deleteForUser(id: string, userId: string): Promise<Category | null> {
    return this.prisma.category.delete({ where: { id, user_id: userId } });
  }
}
