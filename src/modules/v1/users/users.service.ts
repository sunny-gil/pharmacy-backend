import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(dto: CreateUserDto) {
    const existing = await this.userModel.findOne({ email: dto.email });

    if (existing) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.userModel.create({
      ...dto,
      password: hashedPassword,
    });

    return {
      success: true,
      message: 'User created successfully',
      data: this.sanitizeUser(user),
    };
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  private sanitizeUser(user: any) {
    return {
      id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    };
  }
}