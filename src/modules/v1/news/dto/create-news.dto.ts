import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNewsDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  category!: string;

  @IsString()
  @IsNotEmpty()
  shortDesc!: string;

  @IsString()
  @IsNotEmpty()
  content!: string;

  @IsString()
  @IsNotEmpty()
  image!: string;

  @IsString()
  @IsNotEmpty()
  date!: string;
}
