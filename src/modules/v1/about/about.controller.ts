import {
  Body,
  Controller,
  Get,
  Patch,
  UseInterceptors,
} from '@nestjs/common';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AboutService } from './about.service';
import { CreateAboutDto } from './dto/create-about.dto';

@ApiTags('About')
@Controller('v1/about')
export class AboutController {
  constructor(private readonly aboutService: AboutService) {}

  @Get()
  @UseInterceptors(CacheInterceptor)
  @CacheKey('about_data')
  @CacheTTL(86400000) // 24 hours
  @ApiOperation({ summary: 'Get About Us information' })
  @ApiResponse({ status: 200, description: 'Return about info.' })
  getAbout() {
    return this.aboutService.getAbout();
  }

  @Patch()
  @ApiOperation({ summary: 'Update About Us information' })
  @ApiResponse({ status: 200, description: 'About info updated.' })
  updateAbout(@Body() dto: CreateAboutDto) {
    return this.aboutService.updateAbout(dto);
  }
}
