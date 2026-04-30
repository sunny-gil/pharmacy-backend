import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TestimonialDocument = Testimonial & Document;

@Schema({ timestamps: true })
export class Testimonial {
  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  text!: string;

  @Prop({ required: true, default: 5 })
  rating!: number;
}

export const TestimonialSchema = SchemaFactory.createForClass(Testimonial);
