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
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';

@ApiTags('News')
@Controller('v1/news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new news item' })
  @ApiResponse({ status: 201, description: 'The news item has been successfully created.' })
  create(@Body() createNewsDto: CreateNewsDto) {
    return this.newsService.create(createNewsDto);
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  @CacheKey('news_all')
  @CacheTTL(600000)
  @ApiOperation({ summary: 'Get all news items' })
  @ApiResponse({ status: 200, description: 'Return all news items.' })
  findAll() {
    return this.newsService.findAll();
  }

  @Get(':id')
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({ summary: 'Get a news item by ID' })
  @ApiParam({ name: 'id', description: 'News ID' })
  @ApiResponse({ status: 200, description: 'Return the news item.' })
  @ApiResponse({ status: 404, description: 'News item not found.' })
  findOne(@Param('id') id: string) {
    return this.newsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a news item' })
  @ApiParam({ name: 'id', description: 'News ID' })
  @ApiResponse({ status: 200, description: 'The news item has been successfully updated.' })
  update(@Param('id') id: string, @Body() updateNewsDto: any) {
    return this.newsService.update(id, updateNewsDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a news item' })
  @ApiParam({ name: 'id', description: 'News ID' })
  @ApiResponse({ status: 200, description: 'The news item has been successfully deleted.' })
  remove(@Param('id') id: string) {
    return this.newsService.remove(id);
  }
}
