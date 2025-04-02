import { TransactionType } from '@prisma/client';
import {
  IsDateString,
  IsEnum,
  IsISO8601,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  Min,
} from 'class-validator';

export class CreateTransactionDto {
  @IsEnum(TransactionType)
  type: TransactionType;

  @IsNumber()
  @Min(0.01)
  amount: number;

  @IsOptional()
  @IsString()
  description?: string;

  @Matches(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z$/, {
    message:
      'Date must be in format with time (e.g., 2025-04-01T12:30:00.000Z)',
  })
  date: string;

  @IsUUID()
  wallet_id: string;

  @IsUUID()
  category_id: string;
}
