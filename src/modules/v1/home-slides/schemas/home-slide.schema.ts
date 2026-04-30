import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type HomeSlideDocument = HomeSlide & Document;

@Schema()
class FloatCard {
  @Prop({ required: true })
  icon!: string;

  @Prop({ required: true })
  text!: string;
}

@Schema()
class Stat {
  @Prop({ required: true })
  value!: string;

  @Prop({ required: true })
  label!: string;
}

@Schema({ timestamps: true })
export class HomeSlide {
  @Prop({ required: true })
  badge!: string;

  @Prop({ required: true })
  title!: string;

  @Prop({ required: true })
  highlight!: string;

  @Prop({ default: '' })
  titleEnd!: string;

  @Prop({ required: true })
  tagline!: string;

  @Prop({ required: true })
  typewriterText!: string;

  @Prop({ required: true })
  desc!: string;

  @Prop({ type: [String], default: [] })
  chips!: string[];

  @Prop({ required: true })
  image!: string;

  @Prop({ required: true })
  bgClass!: string;

  @Prop({ required: true })
  accent!: string;

  @Prop({ required: true })
  accentAlt!: string;

  @Prop({ required: true })
  glow!: string;

  @Prop({ type: [String], required: true })
  orbColors!: string[];

  @Prop({ type: [FloatCard], default: [] })
  floatCards!: FloatCard[];

  @Prop({ type: [Stat], default: [] })
  stats!: Stat[];
}

export const HomeSlideSchema = SchemaFactory.createForClass(HomeSlide);
