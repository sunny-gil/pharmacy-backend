import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@ApiTags('Users & Profile')
@Controller('v1/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('create')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User created successfully.' })
  async create(@Body() dto: CreateUserDto) {
    const user = await this.usersService.create(dto);
    return {
      message: 'User created successfully',
      data: this.usersService.sanitizeUser(user),
    };
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(CacheInterceptor)
  @CacheKey('user_profile')
  @CacheTTL(300)
  @Get('profile')
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({ status: 200, description: 'Return user profile.' })
  async getProfile(@Request() req: any) {
    const user = await this.usersService.findById(req.user.id);
    return this.usersService.sanitizeUser(user);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch('profile')
  @ApiOperation({ summary: 'Update current user profile' })
  @ApiResponse({ status: 200, description: 'Profile updated successfully.' })
  async updateProfile(@Request() req: any, @Body() updateData: any) {
    const user = await this.usersService.update(req.user.id, updateData);
    // Logic to clear cache would typically involve cacheManager.del('user_profile')
    return {
      message: 'Profile updated successfully',
      data: this.usersService.sanitizeUser(user),
    };
  }
}