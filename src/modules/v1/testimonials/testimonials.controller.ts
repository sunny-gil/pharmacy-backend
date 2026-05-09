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
import { TestimonialsService } from './testimonials.service';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';

@ApiTags('Testimonials')
@Controller('v1/testimonials')
export class TestimonialsController {
  constructor(private readonly testimonialsService: TestimonialsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new testimonial' })
  @ApiResponse({ status: 201, description: 'The testimonial has been successfully created.' })
  create(@Body() createTestimonialDto: CreateTestimonialDto) {
    return this.testimonialsService.create(createTestimonialDto);
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  @CacheKey('testimonials_all')
  @CacheTTL(600000)
  @ApiOperation({ summary: 'Get all testimonials' })
  @ApiResponse({ status: 200, description: 'Return all testimonials.' })
  findAll() {
    return this.testimonialsService.findAll();
  }

  @Get(':id')
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({ summary: 'Get a testimonial by ID' })
  @ApiParam({ name: 'id', description: 'Testimonial ID' })
  @ApiResponse({ status: 200, description: 'Return the testimonial.' })
  @ApiResponse({ status: 404, description: 'Testimonial not found.' })
  findOne(@Param('id') id: string) {
    return this.testimonialsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a testimonial' })
  @ApiParam({ name: 'id', description: 'Testimonial ID' })
  @ApiResponse({ status: 200, description: 'The testimonial has been successfully updated.' })
  update(@Param('id') id: string, @Body() updateTestimonialDto: any) {
    return this.testimonialsService.update(id, updateTestimonialDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a testimonial' })
  @ApiParam({ name: 'id', description: 'Testimonial ID' })
  @ApiResponse({ status: 200, description: 'The testimonial has been successfully deleted.' })
  remove(@Param('id') id: string) {
    return this.testimonialsService.remove(id);
  }
}
