import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Order } from './schemas/order.schema';
import type { OrderDocument } from './schemas/order.schema';
import { CreateOrderDto } from './dto/order.dto';
import { CartService } from '../cart/cart.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    private cartService: CartService,
  ) {}

  async createOrder(userId: string, dto: CreateOrderDto): Promise<Order> {
    const cart = await this.cartService.getCart(userId);
    if (!cart || !cart.items || cart.items.length === 0) {
      throw new BadRequestException('Cart is empty');
    }

    let totalAmount = 0;
    const orderItems = cart.items.map((item: any) => {
      const price = item.product.price;
      totalAmount += price * item.quantity;
      return {
        product: item.product._id,
        quantity: item.quantity,
        price: price,
      };
    });

    const order = await this.orderModel.create({
      user: userId as any,
      items: orderItems,
      totalAmount,
      shippingAddress: dto.shippingAddress,
      paymentMethod: dto.paymentMethod || 'cod',
    });

    await this.cartService.clearCart(userId);
    return order;
  }

  async getMyOrders(userId: string): Promise<Order[]> {
    return this.orderModel
      .find({ user: userId as any })
      .sort({ createdAt: -1 })
      .populate('items.product')
      .exec();
  }

  async getOrderById(userId: string, orderId: string): Promise<Order> {
    const order = await this.orderModel
      .findOne({ _id: orderId as any, user: userId as any })
      .populate('items.product')
      .exec();

    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  async cancelOrder(userId: string, orderId: string): Promise<Order> {
    const order = await this.orderModel.findOne({
      _id: orderId as any,
      user: userId as any,
    });

    if (!order) throw new NotFoundException('Order not found');
    if (order.status !== 'pending') {
      throw new BadRequestException('Cannot cancel order in current status');
    }

    order.status = 'cancelled';
    return order.save();
  }
}
