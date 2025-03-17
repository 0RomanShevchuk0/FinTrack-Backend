import { LoginDto } from './login.dto';
import { IsString, MinLength } from 'class-validator';

export class RegisterDto extends LoginDto {
  @IsString()
  @MinLength(3)
  firstName: string;

  @IsString()
  @MinLength(3)
  lastName: string;
}
