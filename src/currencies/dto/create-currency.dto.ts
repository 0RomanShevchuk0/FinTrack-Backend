import { IsString, Length, Matches, MinLength } from 'class-validator';

export class CreateCurrencyDto {
  @IsString()
  @Length(3, 50)
  name: string;

  @IsString()
  @Length(3, 3)
  @Matches(/^[A-Z]{3}$/, {
    message: 'Code must be exactly 3 uppercase letters (ISO 4217)',
  })
  code: string;

  @IsString()
  @Length(1, 5)
  symbol: string;
}
