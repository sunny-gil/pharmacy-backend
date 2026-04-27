import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    return this.usersService.create(dto);
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(dto.password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return this.generateToken(user);
  }

  private generateToken(user: any) {
    const payload = {
      sub: user._id,
      email: user.email,
    };

    return {
      success: true,
      message: 'Login successful',
      access_token: this.jwtService.sign(payload),
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    };
  }

  // async googleLogin(googleUser: any) {
  //   // 1. try by googleId
  //   let user = await this.usersService.findByGoogleId(googleUser.googleId);

  //   // 2. try by email (linking)
  //   if (!user && googleUser.email) {
  //     user = await this.usersService.findByEmail(googleUser.email);

  //     if (user) {
  //       // 🔗 link google account
  //       user = await this.usersService.updateUser(user._id, {
  //         googleId: googleUser.googleId,
  //         provider: 'google',
  //       });
  //     }
  //   }

  //   // 3. create new user
  //   if (!user) {
  //     user = await this.usersService.create({
  //       name: googleUser.name,
  //       email: googleUser.email,
  //       googleId: googleUser.googleId,
  //       provider: 'google',
  //     });
  //   }

  //   return this.generateToken(user);
  // }

  // in-memory store (DEV only)
  private otpStore = new Map<string, { otp: string; expires: number }>();

  async sendOtp(phone: string) {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    this.otpStore.set(phone, {
      otp,
      expires: Date.now() + 5 * 60 * 1000, // 5 min
    });

    console.log('OTP:', otp); // replace with SMS later

    return { message: 'OTP sent' };
  }

  async verifyOtp(phone: string, otp: string) {
  const record = this.otpStore.get(phone);

  if (!record || record.otp !== otp || Date.now() > record.expires) {
    throw new BadRequestException('Invalid or expired OTP');
  }

  this.otpStore.delete(phone);

  // 1. find user
  // let user = await this.usersService.findByPhone(phone);

  // 2. create if not exists
  // if (!user) {
  //   user = await this.usersService.create({
  //     phone,
  //     provider: 'phone',
  //   });
  // }

  // return this.generateToken(user);
}
}
