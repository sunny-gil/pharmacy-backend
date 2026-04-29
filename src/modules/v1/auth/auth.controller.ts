import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }


  @Get('google')
@UseGuards(AuthGuard('google'))
async googleLogin() {}

@Get('google/callback')
@UseGuards(AuthGuard('google'))
async googleCallback(@Req() req, @Res() res) {
  const result = await this.authService.googleLogin(req.user);

  const token = result.access_token;

   const frontendUrl =
    process.env.FRONTEND_URL || "http://localhost:5173";

  return res.redirect(
    `${frontendUrl}/auth-success?token=${token}`
  );
}
  // @Get('google')
  // @UseGuards(AuthGuard('google'))
  // async googleLogin() {}

  // @Get('google/callback')
  // @UseGuards(AuthGuard('google'))
  // async googleCallback(@Req() req) {
  //   return this.authService.googleLogin(req.user);
  // }

  // @Post('send-otp')
  // sendOtp(@Body() dto: SendOtpDto) {
  //   return this.authService.sendOtp(dto.phone);
  // }

  // @Post('verify-otp')
  // verifyOtp(@Body() dto: VerifyOtpDto) {
  //   return this.authService.verifyOtp(dto.phone, dto.otp);
  // }
}
