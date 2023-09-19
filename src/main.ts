import { NestFactory } from '@nestjs/core';
import { CoreModule } from '@submodule/core';
import { User } from '@submodule/entity';

async function bootstrap() {
  const app = await NestFactory.create(CoreModule);
  await app.listen(3000);
  console.log(new User());
}
bootstrap();
