import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { doubleCsrf } from 'csrf-csrf';

const logger = new Logger('Bootstrap');


async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    app.enableCors({
      origin: '*',
      methods: '*',
      allowedHeaders: 'Content-Type, Authorization',
    });

    // Swagger Configuration
    const config = new DocumentBuilder()
      .setTitle('Auth Microservice API')
      .setDescription('API documentation for authentication service')
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);

    await app.listen(`${process.env.APP_PORT}`);
    logger.log(`Auth Service running on http://localhost:4000 ...`);

  } catch (error) {
    logger.error('internal Server Error', error);
    process.exit(1);
  }
}
bootstrap();

