import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HomeSlide, HomeSlideDocument } from './schemas/home-slide.schema';
import { CreateHomeSlideDto } from './dto/create-home-slide.dto';

@Injectable()
export class HomeSlidesService {
  constructor(
    @InjectModel(HomeSlide.name)
    private homeSlideModel: Model<HomeSlideDocument>,
  ) {}

  async create(createHomeSlideDto: CreateHomeSlideDto): Promise<HomeSlide> {
    const createdSlide = new this.homeSlideModel(createHomeSlideDto);
    return createdSlide.save();
  }

  async findAll(): Promise<HomeSlide[]> {
    return this.homeSlideModel.find().exec();
  }

  async findOne(id: string): Promise<HomeSlide> {
    const slide = await this.homeSlideModel.findById(id).exec();
    if (!slide) {
      throw new NotFoundException(`HomeSlide with ID ${id} not found`);
    }
    return slide;
  }

  async update(id: string, updateHomeSlideDto: any): Promise<HomeSlide> {
    const updatedSlide = await this.homeSlideModel
      .findByIdAndUpdate(id, updateHomeSlideDto, { new: true })
      .exec();
    if (!updatedSlide) {
      throw new NotFoundException(`HomeSlide with ID ${id} not found`);
    }
    return updatedSlide;
  }

  async remove(id: string): Promise<any> {
    const result = await this.homeSlideModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`HomeSlide with ID ${id} not found`);
    }
    return { message: 'HomeSlide deleted successfully' };
  }
}
