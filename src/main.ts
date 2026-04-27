import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Global API prefix
  app.setGlobalPrefix('api');

  // ✅ Global validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const port = process.env.PORT || 3000;

  await app.listen(port);

  // ✅ Proper console logs
  console.log(`🚀 Server running on: http://localhost:${port}`);
  console.log(`📦 Environment: ${process.env.NODE_ENV || 'development'}`);
}
bootstrap();