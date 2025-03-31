import { WalletType } from '@prisma/client';
import {
  IsString,
  IsNumber,
  IsUUID,
  MinLength,
  IsPositive,
  IsEnum,
} from 'class-validator';

export class CreateWalletDto {
  @IsEnum(WalletType)
  type: WalletType;

  @IsString()
  @MinLength(3)
  name: string;

  @IsNumber()
  @IsPositive()
  balance: number;

  @IsUUID()
  currency_id: string;
}
