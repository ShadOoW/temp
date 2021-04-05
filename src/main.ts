/**
 * Main.ts is the bootstrap of the App start with AppModule
 * The App use Swagger for documenting, and Express for APIs
 * All routes strat with prefix API/V1 means first version of the app
 */
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import 'dotenv/config';
import { AppModule } from './app.module';
import { configService } from './config/config.service';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  if (!configService.isProduction()) {
    const document = SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle('Item API')
        .setDescription('My Item API')
        .build(),
    );

    SwaggerModule.setup('docs', app, document);
  }
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
