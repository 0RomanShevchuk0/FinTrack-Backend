import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { RequestWithUser } from 'src/types/request-with-user';

@Auth()
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  findAll(@Request() req: RequestWithUser) {
    return this.categoriesService.findAllForUser(req.user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req: RequestWithUser) {
    return this.categoriesService.findOneForUser(id, req.user.userId);
  }

  @Post()
  create(
    @Body() createCategoryDto: CreateCategoryDto,
    @Request() req: RequestWithUser,
  ) {
    return this.categoriesService.createForUser(createCategoryDto, req.user.userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @Request() req: RequestWithUser,
  ) {
    return this.categoriesService.updateForUser(
      id,
      updateCategoryDto,
      req.user.userId,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: RequestWithUser) {
    return this.categoriesService.removeForUser(id, req.user.userId);
  }
}
