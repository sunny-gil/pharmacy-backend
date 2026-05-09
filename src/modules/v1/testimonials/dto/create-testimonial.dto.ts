import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTestimonialDto {
  @ApiProperty({ description: 'Name of the person giving the testimonial', example: 'Rahul Sharma' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ description: 'The testimonial text' })
  @IsString()
  @IsNotEmpty()
  text!: string;

  @ApiProperty({ description: 'Rating from 1 to 5', example: 5 })
  @IsNumber()
  @Min(1)
  @Max(5)
  @IsNotEmpty()
  rating!: number;
}
