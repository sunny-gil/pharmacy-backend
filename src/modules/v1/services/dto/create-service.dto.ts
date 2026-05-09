import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateServiceDto {
  @ApiProperty({ description: 'The title of the service', example: 'Ayurvedic Consultation' })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({ description: 'Icon name/identifier', example: 'Stethoscope' })
  @IsString()
  @IsNotEmpty()
  icon!: string;

  @ApiProperty({ description: 'Short description', example: 'Expert consultation for chronic diseases' })
  @IsString()
  @IsNotEmpty()
  shortDesc!: string;

  @ApiProperty({ description: 'Detailed description' })
  @IsString()
  @IsNotEmpty()
  longDesc!: string;

  @ApiProperty({ description: 'Service image URL' })
  @IsString()
  @IsNotEmpty()
  image!: string;

  @ApiProperty({ description: 'CSS gradient for background', example: 'from-blue-500 to-cyan-500' })
  @IsString()
  @IsNotEmpty()
  gradient!: string;
}
