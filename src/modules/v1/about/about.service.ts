import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { About } from './schemas/about.schema';
import type { AboutDocument } from './schemas/about.schema';
import { CreateAboutDto } from './dto/create-about.dto';

@Injectable()
export class AboutService {
  constructor(
    @InjectModel(About.name) private aboutModel: Model<AboutDocument>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getAbout(): Promise<About> {
    const about = await this.aboutModel.findOne().exec();
    if (!about) {
      throw new NotFoundException('About information not found');
    }
    return about;
  }

  async updateAbout(dto: CreateAboutDto): Promise<About> {
    let about = await this.aboutModel.findOne().exec();
    if (about) {
      about = await this.aboutModel
        .findByIdAndUpdate(about._id, dto, { new: true })
        .exec();
    } else {
      about = await this.aboutModel.create(dto);
    }
    await this.cacheManager.del('about_data');
    return about!;
  }
}
