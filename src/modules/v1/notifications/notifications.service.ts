import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Notification } from './schemas/notification.schema';
import type { NotificationDocument } from './schemas/notification.schema';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(Notification.name)
    private notificationModel: Model<NotificationDocument>,
  ) {}

  async create(userId: string, dto: CreateNotificationDto): Promise<Notification> {
    return this.notificationModel.create({
      user: userId as any,
      ...dto,
    });
  }

  async getMyNotifications(userId: string): Promise<Notification[]> {
    return this.notificationModel
      .find({ user: userId as any })
      .sort({ createdAt: -1 })
      .exec();
  }

  async markAsRead(userId: string, notificationId: string): Promise<Notification> {
    const notification = await this.notificationModel.findOneAndUpdate(
      { _id: notificationId as any, user: userId as any },
      { isRead: true },
      { new: true },
    );
    if (!notification) throw new NotFoundException('Notification not found');
    return notification;
  }

  async markAllAsRead(userId: string): Promise<void> {
    await this.notificationModel.updateMany(
      { user: userId as any, isRead: false },
      { isRead: true },
    );
  }

  async delete(userId: string, notificationId: string): Promise<void> {
    const result = await this.notificationModel.deleteOne({
      _id: notificationId as any,
      user: userId as any,
    });
    if (result.deletedCount === 0) throw new NotFoundException('Notification not found');
  }
}
