import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { EventModule } from './event/event.module';

async function bootstrap() {
  const app = await NestFactory.create(EventModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(3000);
}
bootstrap();
