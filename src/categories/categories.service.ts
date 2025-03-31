import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoriesRepository } from './categories.repository';

@Injectable()
export class CategoriesService {
  constructor(private categoriesRepository: CategoriesRepository) {}

  findAllForUser(userId: string) {
    return this.categoriesRepository.findAllForUser(userId);
  }

  findOneForUser(id: string, userId: string) {
    return this.categoriesRepository.findOneByIdForUser(id, userId);
  }

  createForUser(createCategoryDto: CreateCategoryDto, userId: string) {
    return this.categoriesRepository.createForUser(createCategoryDto, userId);
  }

  updateForUser(id: string, updateCategoryDto: UpdateCategoryDto, userId: string) {
    return this.categoriesRepository.updateForUser(id, updateCategoryDto, userId);
  }

  removeForUser(id: string, userId: string) {
    return this.categoriesRepository.deleteForUser(id, userId);
  }
}
