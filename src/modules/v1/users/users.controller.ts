import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('v1/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

@Post('create')
create(@Body() dto: CreateUserDto) {
  return this.usersService.create(dto);
}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: any) {
    return {
      success: true,
      user: req.user,
    };
  }
}