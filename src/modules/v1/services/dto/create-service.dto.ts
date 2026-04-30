import { IsNotEmpty, IsString } from 'class-validator';

export class CreateServiceDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  icon!: string;

  @IsString()
  @IsNotEmpty()
  shortDesc!: string;

  @IsString()
  @IsNotEmpty()
  longDesc!: string;

  @IsString()
  @IsNotEmpty()
  image!: string;

  @IsString()
  @IsNotEmpty()
  gradient!: string;
}
