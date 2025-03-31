import { TransactionType } from '@prisma/client';
import { IsEnum, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateCategoryDto {
  @IsEnum(TransactionType)
  type: TransactionType;

  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
	@IsOptional()
  description?: string;
}
