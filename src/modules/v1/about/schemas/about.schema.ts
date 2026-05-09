import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AboutDocument = About & Document;

@Schema({ timestamps: true })
export class About {
  @Prop({ required: true })
  title!: string;

  @Prop({ required: true })
  description!: string;

  @Prop({ required: true })
  mission!: string;

  @Prop({ required: true })
  vision!: string;

  @Prop({ type: [String], default: [] })
  images!: string[];

  @Prop({ type: [Object], default: [] })
  team!: { name: string; position: string; image: string }[];

  @Prop({ type: [Object], default: [] })
  stats!: { value: string; label: string }[];
}

export const AboutSchema = SchemaFactory.createForClass(About);
