import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { Role } from '../entity/user.entity';

export class UserDto {
  id: number;

  @IsEmail()
  email: string;

  @MinLength(4)
  password: string;

  @IsString()
  @MinLength(3)
  firstName: string;

  @IsString()
  @MinLength(3)
  lastName: string;

  createdAt: Date;

  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;
}
