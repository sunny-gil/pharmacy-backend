import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { News } from './schemas/news.schema';
import type { NewsDocument } from './schemas/news.schema';
import { CreateNewsDto } from './dto/create-news.dto';

@Injectable()
export class NewsService {
  constructor(
    @InjectModel(News.name) private newsModel: Model<NewsDocument>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  private async clearCache(id?: string) {
    await this.cacheManager.del('news_all');
    if (id) {
      await this.cacheManager.del(`/api/v1/news/${id}`);
    }
  }

  async create(createNewsDto: CreateNewsDto): Promise<News> {
    const createdNews = new this.newsModel(createNewsDto);
    const savedNews = await createdNews.save();
    await this.clearCache();
    return savedNews;
  }

  async findAll(): Promise<News[]> {
    return this.newsModel.find().sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string): Promise<News> {
    const news = await this.newsModel.findById(id).exec();
    if (!news) {
      throw new NotFoundException(`News with ID ${id} not found`);
    }
    return news;
  }

  async update(id: string, updateNewsDto: any): Promise<News> {
    const updatedNews = await this.newsModel
      .findByIdAndUpdate(id, updateNewsDto, { new: true })
      .exec();
    if (!updatedNews) {
      throw new NotFoundException(`News with ID ${id} not found`);
    }
    await this.clearCache(id);
    return updatedNews;
  }

  async remove(id: string): Promise<any> {
    const result = await this.newsModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`News with ID ${id} not found`);
    }
    await this.clearCache(id);
    return { message: 'News deleted successfully' };
  }
}
