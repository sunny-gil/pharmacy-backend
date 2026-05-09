import { IsNotEmpty, IsString, IsArray, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAboutDto {
  @ApiProperty({ example: 'About Abhyudaya Pharmacy' })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({ example: 'Leading provider of authentic Ayurvedic medicines...' })
  @IsString()
  @IsNotEmpty()
  description!: string;

  @ApiProperty({ example: 'To provide quality healthcare through nature.' })
  @IsString()
  @IsNotEmpty()
  mission!: string;

  @ApiProperty({ example: 'To become the global leader in Ayurveda.' })
  @IsString()
  @IsNotEmpty()
  vision!: string;

  @ApiProperty({ type: [String], required: false })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  images?: string[];

  @ApiProperty({ type: [Object], required: false })
  @IsArray()
  @IsOptional()
  team?: { name: string; position: string; image: string }[];

  @ApiProperty({ type: [Object], required: false })
  @IsArray()
  @IsOptional()
  stats?: { value: string; label: string }[];
}
