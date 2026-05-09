import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { HomeSlidesService } from './home-slides.service';
import { CreateHomeSlideDto } from './dto/create-home-slide.dto';

@ApiTags('Home Slides')
@Controller('v1/home-slides')
export class HomeSlidesController {
  constructor(private readonly homeSlidesService: HomeSlidesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new home slide' })
  @ApiResponse({ status: 201, description: 'The slide has been successfully created.' })
  create(@Body() createHomeSlideDto: CreateHomeSlideDto) {
    return this.homeSlidesService.create(createHomeSlideDto);
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  @CacheKey('home_slides_all')
  @CacheTTL(600000)
  @ApiOperation({ summary: 'Get all home slides' })
  @ApiResponse({ status: 200, description: 'Return all home slides.' })
  findAll() {
    return this.homeSlidesService.findAll();
  }

  @Get(':id')
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({ summary: 'Get a home slide by ID' })
  @ApiParam({ name: 'id', description: 'Slide ID' })
  @ApiResponse({ status: 200, description: 'Return the slide.' })
  @ApiResponse({ status: 404, description: 'Slide not found.' })
  findOne(@Param('id') id: string) {
    return this.homeSlidesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a home slide' })
  @ApiParam({ name: 'id', description: 'Slide ID' })
  @ApiResponse({ status: 200, description: 'The slide has been successfully updated.' })
  update(@Param('id') id: string, @Body() updateHomeSlideDto: any) {
    return this.homeSlidesService.update(id, updateHomeSlideDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a home slide' })
  @ApiParam({ name: 'id', description: 'Slide ID' })
  @ApiResponse({ status: 200, description: 'The slide has been successfully deleted.' })
  remove(@Param('id') id: string) {
    return this.homeSlidesService.remove(id);
  }
}
