import { NestFactory } from '@nestjs/core';
import { SeederModule } from './seeder.module';
import { SeederService } from './seeder.service';

async function bootstrap() {
  NestFactory.createApplicationContext(SeederModule).then((appContext) => {
    appContext
      .get(SeederService)
      .seed()
      .finally(() => appContext.close());
  });
}

bootstrap();
