import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { HomeSlide, type HomeSlideDocument } from './schemas/home-slide.schema';
import { CreateHomeSlideDto } from './dto/create-home-slide.dto';

@Injectable()
export class HomeSlidesService {
  constructor(
    @InjectModel(HomeSlide.name)
    private homeSlideModel: Model<HomeSlideDocument>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  private async clearCache(id?: string) {
    await this.cacheManager.del('home_slides_all');
    if (id) {
      await this.cacheManager.del(`/api/v1/home-slides/${id}`);
    }
  }

  async create(createHomeSlideDto: CreateHomeSlideDto): Promise<HomeSlide> {
    const createdHomeSlide = new this.homeSlideModel(createHomeSlideDto);
    const savedSlide = await createdHomeSlide.save();
    await this.clearCache();
    return savedSlide;
  }

  async findAll(): Promise<HomeSlide[]> {
    return this.homeSlideModel.find().exec();
  }

  async findOne(id: string): Promise<HomeSlide> {
    const homeSlide = await this.homeSlideModel.findById(id).exec();
    if (!homeSlide) {
      throw new NotFoundException(`HomeSlide with ID ${id} not found`);
    }
    return homeSlide;
  }

  async update(id: string, updateHomeSlideDto: any): Promise<HomeSlide> {
    const updatedHomeSlide = await this.homeSlideModel
      .findByIdAndUpdate(id, updateHomeSlideDto, { new: true })
      .exec();
    if (!updatedHomeSlide) {
      throw new NotFoundException(`HomeSlide with ID ${id} not found`);
    }
    await this.clearCache(id);
    return updatedHomeSlide;
  }

  async remove(id: string): Promise<any> {
    const result = await this.homeSlideModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`HomeSlide with ID ${id} not found`);
    }
    await this.clearCache(id);
    return { message: 'HomeSlide deleted successfully' };
  }
}
