import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateBlogDto {
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

  @IsString()
  @IsNotEmpty()
  readTime!: string;
}
