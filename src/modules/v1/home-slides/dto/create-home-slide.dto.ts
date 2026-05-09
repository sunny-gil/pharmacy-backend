import { IsNotEmpty, IsString, IsArray, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateHomeSlideDto {
  @ApiProperty({ example: 'New Arrival' })
  @IsString()
  @IsNotEmpty()
  badge!: string;

  @ApiProperty({ example: 'Ayurvedic' })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({ example: 'Solutions' })
  @IsString()
  @IsNotEmpty()
  highlight!: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  titleEnd?: string;

  @ApiProperty({ example: 'Discover the power of nature' })
  @IsString()
  @IsNotEmpty()
  tagline!: string;

  @ApiProperty({ example: 'Healing | Wellness | Balance' })
  @IsString()
  @IsNotEmpty()
  typewriterText!: string;

  @ApiProperty({ description: 'Detailed description for the slide' })
  @IsString()
  @IsNotEmpty()
  desc!: string;

  @ApiProperty({ type: [String], example: ['Pure', 'Organic'] })
  @IsArray()
  @IsString({ each: true })
  chips!: string[];

  @ApiProperty({ description: 'Image URL' })
  @IsString()
  @IsNotEmpty()
  image!: string;

  @ApiProperty({ example: 'bg-green-500' })
  @IsString()
  @IsNotEmpty()
  bgClass!: string;

  @ApiProperty({ example: 'text-green-600' })
  @IsString()
  @IsNotEmpty()
  accent!: string;

  @ApiProperty({ example: 'text-cyan-600' })
  @IsString()
  @IsNotEmpty()
  accentAlt!: string;

  @ApiProperty({ example: 'shadow-green-500/50' })
  @IsString()
  @IsNotEmpty()
  glow!: string;

  @ApiProperty({ type: [String], example: ['#00ff00', '#00ffff'] })
  @IsArray()
  @IsString({ each: true })
  orbColors!: string[];

  @ApiProperty({ type: [Object], example: [{ icon: 'leaf', text: 'Natural' }] })
  @IsArray()
  floatCards!: { icon: string; text: string }[];

  @ApiProperty({ type: [Object], example: [{ value: '100%', label: 'Pure' }] })
  @IsArray()
  stats!: { value: string; label: string }[];
}
