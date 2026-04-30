import { IsNotEmpty, IsString, IsArray, IsOptional } from 'class-validator';

export class CreateHomeSlideDto {
  @IsString()
  @IsNotEmpty()
  badge!: string;

  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  highlight!: string;

  @IsString()
  @IsOptional()
  titleEnd?: string;

  @IsString()
  @IsNotEmpty()
  tagline!: string;

  @IsString()
  @IsNotEmpty()
  typewriterText!: string;

  @IsString()
  @IsNotEmpty()
  desc!: string;

  @IsArray()
  @IsString({ each: true })
  chips!: string[];

  @IsString()
  @IsNotEmpty()
  image!: string;

  @IsString()
  @IsNotEmpty()
  bgClass!: string;

  @IsString()
  @IsNotEmpty()
  accent!: string;

  @IsString()
  @IsNotEmpty()
  accentAlt!: string;

  @IsString()
  @IsNotEmpty()
  glow!: string;

  @IsArray()
  @IsString({ each: true })
  orbColors!: string[];

  @IsArray()
  floatCards!: { icon: string; text: string }[];

  @IsArray()
  stats!: { value: string; label: string }[];
}
