import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ServiceDocument = Service & Document;

@Schema({ timestamps: true })
export class Service {
  @Prop({ required: true })
  title!: string;

  @Prop({ required: true })
  icon!: string; // Identifier for lucide-react icon

  @Prop({ required: true })
  shortDesc!: string;

  @Prop({ required: true })
  longDesc!: string;

  @Prop({ required: true })
  image!: string;

  @Prop({ required: true })
  gradient!: string;
}

export const ServiceSchema = SchemaFactory.createForClass(Service);
