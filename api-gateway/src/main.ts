import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './Gateway.module';
import { Logger } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

async function bootstrap() {
  
  const app = await NestFactory.create(GatewayModule);

  await app.listen(`${process.env.PORT}`);
  
  Logger.log(`API Gateway is running on http://localhost:${process.env.PORT}/api`);

}
bootstrap();
