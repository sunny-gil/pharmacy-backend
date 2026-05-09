import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { Testimonial, type TestimonialDocument } from './schemas/testimonial.schema';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';

@Injectable()
export class TestimonialsService {
  constructor(
    @InjectModel(Testimonial.name)
    private testimonialModel: Model<TestimonialDocument>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  private async clearCache(id?: string) {
    await this.cacheManager.del('testimonials_all');
    if (id) {
      await this.cacheManager.del(`/api/v1/testimonials/${id}`);
    }
  }

  async create(createTestimonialDto: CreateTestimonialDto): Promise<Testimonial> {
    const createdTestimonial = new this.testimonialModel(createTestimonialDto);
    const savedTestimonial = await createdTestimonial.save();
    await this.clearCache();
    return savedTestimonial;
  }

  async findAll(): Promise<Testimonial[]> {
    return this.testimonialModel.find().sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string): Promise<Testimonial> {
    const testimonial = await this.testimonialModel.findById(id).exec();
    if (!testimonial) {
      throw new NotFoundException(`Testimonial with ID ${id} not found`);
    }
    return testimonial;
  }

  async update(id: string, updateTestimonialDto: any): Promise<Testimonial> {
    const updatedTestimonial = await this.testimonialModel
      .findByIdAndUpdate(id, updateTestimonialDto, { new: true })
      .exec();
    if (!updatedTestimonial) {
      throw new NotFoundException(`Testimonial with ID ${id} not found`);
    }
    await this.clearCache(id);
    return updatedTestimonial;
  }

  async remove(id: string): Promise<any> {
    const result = await this.testimonialModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Testimonial with ID ${id} not found`);
    }
    await this.clearCache(id);
    return { message: 'Testimonial deleted successfully' };
  }
}
