import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CacheModule } from '@nestjs/cache-manager';
import { AboutService } from './about.service';
import { AboutController } from './about.controller';
import { About, AboutSchema } from './schemas/about.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: About.name, schema: AboutSchema }]),
    CacheModule.register({
      ttl: 86400000,
      max: 1,
    }),
  ],
  controllers: [AboutController],
  providers: [AboutService],
})
export class AboutModule {}
