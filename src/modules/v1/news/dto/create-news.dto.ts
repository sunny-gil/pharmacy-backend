import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNewsDto {
  @ApiProperty({ description: 'The title of the news item', example: 'New Branch Opening in Delhi' })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({ description: 'Category of the news', example: 'Expansion' })
  @IsString()
  @IsNotEmpty()
  category!: string;

  @ApiProperty({ description: 'Short description/excerpt' })
  @IsString()
  @IsNotEmpty()
  shortDesc!: string;

  @ApiProperty({ description: 'The full content of the news' })
  @IsString()
  @IsNotEmpty()
  content!: string;

  @ApiProperty({ description: 'Main image URL' })
  @IsString()
  @IsNotEmpty()
  image!: string;

  @ApiProperty({ description: 'Date of the news', example: 'May 10, 2026' })
  @IsString()
  @IsNotEmpty()
  date!: string;
}
