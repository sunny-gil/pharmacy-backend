import { IsNotEmpty, IsString, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({
    example: {
      street: '123 Main St',
      city: 'New Delhi',
      state: 'Delhi',
      zipCode: '110001',
      phone: '9876543210',
    },
  })
  @IsObject()
  @IsNotEmpty()
  shippingAddress!: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
  };

  @ApiProperty({ example: 'cod' })
  @IsString()
  @IsOptional()
  paymentMethod?: string;
}

import { IsOptional } from 'class-validator';
