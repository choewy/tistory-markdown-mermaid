import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { User } from '@submodule/entity';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  console.log(new User());
}
bootstrap();
