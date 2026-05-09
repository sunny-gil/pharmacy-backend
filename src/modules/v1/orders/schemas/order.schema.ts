import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  user!: MongooseSchema.Types.ObjectId;

  @Prop({
    type: [
      {
        product: { type: MongooseSchema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    required: true,
  })
  items!: { product: MongooseSchema.Types.ObjectId; quantity: number; price: number }[];

  @Prop({ required: true })
  totalAmount!: number;

  @Prop({
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending',
  })
  status!: string;

  @Prop({ type: Object, required: true })
  shippingAddress!: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
  };

  @Prop({ default: 'cod' })
  paymentMethod!: string;

  @Prop({ default: 'pending' })
  paymentStatus!: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
