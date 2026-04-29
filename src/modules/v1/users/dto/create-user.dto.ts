import { IsEmail, IsOptional, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  name?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Invalid email format' })
  email?: string;

  @IsOptional()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password?: string;

  @IsOptional()
  googleId?: string;

  @IsOptional()
  provider?: string;

  @IsOptional()
  phone?: string;
}