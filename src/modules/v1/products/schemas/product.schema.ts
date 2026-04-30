import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  category!: string;

  @Prop({ required: true })
  shortDesc!: string;

  @Prop({ required: true })
  longDesc!: string;

  @Prop({ required: true })
  price!: number;

  @Prop({ type: [String], default: [] })
  tags!: string[];

  @Prop({ required: true })
  image!: string;

  @Prop({ type: [String], default: [] })
  precautions!: string[];

  @Prop({ required: true })
  storage!: string;

  @Prop({ required: true })
  usage!: string;

  @Prop({ default: 0 })
  rating!: number;

  @Prop({ default: 0 })
  reviews!: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
