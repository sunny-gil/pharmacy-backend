import { Injectable, BadRequestException, NotFoundException, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { User } from './schemas/user.schema';
import type { UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

 async create(dto: CreateUserDto) {
  const existing = dto.email
    ? await this.userModel.findOne({ email: dto.email })
    : null;

  if (existing) {
    throw new BadRequestException('Email already exists');
  }

  const hashedPassword = dto.password
    ? await bcrypt.hash(dto.password, 10)
    : undefined;

  const user = await this.userModel.create({
    ...dto,
    password: hashedPassword,
  });

  return user; // 🔥 ONLY user
}
  async findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  async findById(id: string) {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(id: string, updateData: any) {
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    await this.cacheManager.del(`user_profile_${id}`);
    return updatedUser;
  }

 sanitizeUser(user: any) {
    return {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      provider: user.provider,
      createdAt: user.createdAt,
    };
  }

  async findByGoogleId(googleId: string) {
    return this.userModel.findOne({ googleId });
  }
}
