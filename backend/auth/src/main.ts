import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

const logger = new Logger('Bootstrap');


async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule); 
    app.enableCors({
      origin: '*',
      methods: '*',
      allowedHeaders: 'Content-Type, Authorization',
    }); 
    await app.listen(4000); 
    logger.log(`Auth Service running on http://localhost:4000 ...`);

  } catch (error) { 
    logger.error('internal Server Error', error); 
    process.exit(1);
  }
}
bootstrap();

