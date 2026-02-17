import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json } from 'express';
import { AppService } from './app.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(json());

  //  const appService = app.get(AppService);
  //  await appService.onModuleInit();
  app.useLogger(false);

  const port = process.env.PORT || 4000;
  await app.listen(port, '0.0.0.0');
 
  console.log('app is running on http://localhsost:4000');
}
bootstrap();
