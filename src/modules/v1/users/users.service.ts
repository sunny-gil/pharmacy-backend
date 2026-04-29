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

 sanitizeUser(user: any) {
    return {
      id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    };
  }

  async findByGoogleId(googleId: string) {
    return this.userModel.findOne({ googleId });
  }
}
