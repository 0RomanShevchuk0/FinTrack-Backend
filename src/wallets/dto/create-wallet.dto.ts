import {
  IsString,
  IsNumber,
  IsUUID,
  MinLength,
  IsPositive,
} from 'class-validator';

export class CreateWalletDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsNumber()
  @IsPositive()
  balance: number;

  @IsUUID()
  user_id: string;

  @IsUUID()
  currency_id: string;
}
