import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HomeSlidesService } from './home-slides.service';
import { HomeSlidesController } from './home-slides.controller';
import { HomeSlide, HomeSlideSchema } from './schemas/home-slide.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: HomeSlide.name, schema: HomeSlideSchema },
    ]),
  ],
  controllers: [HomeSlidesController],
  providers: [HomeSlidesService],
  exports: [HomeSlidesService],
})
export class HomeSlidesModule {}
