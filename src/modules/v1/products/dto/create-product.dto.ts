import { IsNotEmpty, IsNumber, IsString, IsArray, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ description: 'The name of the product', example: 'Paracetamol 500mg' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ description: 'Category of the product', example: 'Fever' })
  @IsString()
  @IsNotEmpty()
  category!: string;

  @ApiProperty({ description: 'Short description', example: 'Used for fever and pain relief' })
  @IsString()
  @IsNotEmpty()
  shortDesc!: string;

  @ApiProperty({ description: 'Detailed description' })
  @IsString()
  @IsNotEmpty()
  longDesc!: string;

  @ApiProperty({ description: 'Price in INR', example: 50 })
  @IsNumber()
  @IsNotEmpty()
  price!: number;

  @ApiProperty({ description: 'Tags for searching', example: ['fever', 'pain'], required: false })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @ApiProperty({ description: 'Image URL' })
  @IsString()
  @IsNotEmpty()
  image!: string;

  @ApiProperty({ description: 'Safety precautions', example: ['Do not take on empty stomach'], required: false })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  precautions?: string[];

  @ApiProperty({ description: 'Storage instructions', example: 'Store in a cool dry place' })
  @IsString()
  @IsNotEmpty()
  storage!: string;

  @ApiProperty({ description: 'How to use', example: 'Take one tablet twice a day' })
  @IsString()
  @IsNotEmpty()
  usage!: string;

  @ApiProperty({ description: 'Product rating', example: 4.5, required: false })
  @IsNumber()
  @IsOptional()
  rating?: number;

  @ApiProperty({ description: 'Number of reviews', example: 120, required: false })
  @IsNumber()
  @IsOptional()
  reviews?: number;
}
