import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CacheModule } from '@nestjs/cache-manager';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, UserSchema } from './schemas/user.schema';

@Module({
  imports: [
    // ✅ THIS IS MANDATORY
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
    ]),
    CacheModule.register({
      ttl: 60000, // 1 minute
      max: 100,
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // 👈 important for Auth
})
export class UsersModule {}