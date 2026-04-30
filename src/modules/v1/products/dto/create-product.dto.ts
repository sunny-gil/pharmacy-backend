import { IsNotEmpty, IsNumber, IsString, IsArray, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  category!: string;

  @IsString()
  @IsNotEmpty()
  shortDesc!: string;

  @IsString()
  @IsNotEmpty()
  longDesc!: string;

  @IsNumber()
  @IsNotEmpty()
  price!: number;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @IsString()
  @IsNotEmpty()
  image!: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  precautions?: string[];

  @IsString()
  @IsNotEmpty()
  storage!: string;

  @IsString()
  @IsNotEmpty()
  usage!: string;

  @IsNumber()
  @IsOptional()
  rating?: number;

  @IsNumber()
  @IsOptional()
  reviews?: number;
}
