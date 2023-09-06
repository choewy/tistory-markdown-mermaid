import { NestFactory } from '@nestjs/core';
import { BroadcastModule } from './broadcast.module';

async function bootstrap() {
  const app = await NestFactory.create(BroadcastModule);
  await app.listen(3000);
}
bootstrap();
