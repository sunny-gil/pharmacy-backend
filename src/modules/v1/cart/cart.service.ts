import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Cart } from './schemas/cart.schema';
import type { CartDocument } from './schemas/cart.schema';
import { AddToCartDto } from './dto/cart.dto';

@Injectable()
export class CartService {
  constructor(@InjectModel(Cart.name) private cartModel: Model<CartDocument>) {}

  async getCart(userId: string): Promise<CartDocument> {
    let cart = await this.cartModel
      .findOne({ user: userId as any })
      .populate('items.product')
      .exec();
    
    if (!cart) {
      cart = await this.cartModel.create({ user: userId as any, items: [] });
    }
    return cart;
  }

  async addToCart(userId: string, dto: AddToCartDto): Promise<CartDocument> {
    let cart = await this.cartModel.findOne({ user: userId as any });
    if (!cart) {
      cart = new this.cartModel({ user: userId as any, items: [] });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === dto.productId,
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += dto.quantity;
    } else {
      cart.items.push({ 
        product: new Types.ObjectId(dto.productId) as any, 
        quantity: dto.quantity 
      });
    }

    await cart.save();
    return this.getCart(userId);
  }

  async updateQuantity(userId: string, productId: string, quantity: number): Promise<CartDocument> {
    const cart = await this.cartModel.findOne({ user: userId as any });
    if (!cart) throw new NotFoundException('Cart not found');

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId,
    );

    if (itemIndex > -1) {
      if (quantity === 0) {
        cart.items.splice(itemIndex, 1);
      } else {
        cart.items[itemIndex].quantity = quantity;
      }
      await cart.save();
    }
    return this.getCart(userId);
  }

  async removeItem(userId: string, productId: string): Promise<CartDocument> {
    return this.updateQuantity(userId, productId, 0);
  }

  async clearCart(userId: string): Promise<void> {
    await this.cartModel.findOneAndUpdate(
      { user: userId as any },
      { items: [] },
    ).exec();
  }
}
