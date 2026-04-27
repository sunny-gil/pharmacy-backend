import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './modules/v1/auth/auth.module';
import { UsersModule } from './modules/v1/users/users.module';
import { ProductsModule } from './modules/v1/products/products.module';
import { ServicesModule } from './modules/v1/services/services.module';
import { TestimonialsModule } from './modules/v1/testimonials/testimonials.module';
import { BlogsModule } from './modules/v1/blogs/blogs.module';
import { ContactModule } from './modules/v1/contact/contact.module';

@Module({
  imports: [
    // ✅ ENV load
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // ✅ MongoDB connection (THIS WAS MISSING ❗)
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('MONGO_URI'),
      }),
    }),

    // ✅ Feature modules
    AuthModule,
    UsersModule,
    ProductsModule,
    ServicesModule,
    TestimonialsModule,
    BlogsModule,
    ContactModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}