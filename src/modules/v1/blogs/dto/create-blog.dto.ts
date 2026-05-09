import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBlogDto {
  @ApiProperty({ description: 'The title of the blog post', example: 'Benefits of Ayurvedic Medicine' })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({ description: 'Category of the blog', example: 'Ayurveda' })
  @IsString()
  @IsNotEmpty()
  category!: string;

  @ApiProperty({ description: 'Short description/excerpt', example: 'Discover how Ayurveda can improve your daily life...' })
  @IsString()
  @IsNotEmpty()
  shortDesc!: string;

  @ApiProperty({ description: 'The full content of the blog post' })
  @IsString()
  @IsNotEmpty()
  content!: string;

  @ApiProperty({ description: 'Main image URL' })
  @IsString()
  @IsNotEmpty()
  image!: string;

  @ApiProperty({ description: 'Date of publication', example: 'May 10, 2026' })
  @IsString()
  @IsNotEmpty()
  date!: string;

  @ApiProperty({ description: 'Estimated read time', example: '5 min read' })
  @IsString()
  @IsNotEmpty()
  readTime!: string;
}
