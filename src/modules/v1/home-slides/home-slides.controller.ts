import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HomeSlidesService } from './home-slides.service';
import { CreateHomeSlideDto } from './dto/create-home-slide.dto';

@Controller('v1/home-slides')
export class HomeSlidesController {
  constructor(private readonly homeSlidesService: HomeSlidesService) {}

  @Post()
  create(@Body() createHomeSlideDto: CreateHomeSlideDto) {
    return this.homeSlidesService.create(createHomeSlideDto);
  }

  @Get()
  findAll() {
    return this.homeSlidesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.homeSlidesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHomeSlideDto: any) {
    return this.homeSlidesService.update(id, updateHomeSlideDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.homeSlidesService.remove(id);
  }
}
