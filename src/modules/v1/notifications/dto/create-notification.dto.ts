import { IsNotEmpty, IsString, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNotificationDto {
  @ApiProperty({ example: 'Order Placed' })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({ example: 'Your order #123 has been placed successfully.' })
  @IsString()
  @IsNotEmpty()
  message!: string;

  @ApiProperty({ enum: ['info', 'success', 'warning', 'error'], default: 'info' })
  @IsEnum(['info', 'success', 'warning', 'error'])
  @IsOptional()
  type?: string;
}
