import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop()
  name?: string;

  @Prop({ unique: true, sparse: true, lowercase: true })
  email?: string;

  @Prop()
  password?: string;

  @Prop({ unique: true, sparse: true })
  phone?: string;

  @Prop()
  googleId?: string;

  @Prop({
    enum: ['local', 'google', 'phone'],
    default: 'local',
  })
  provider!: string;

  @Prop({ default: true })
  isActive!: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);