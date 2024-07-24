import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as ejs from 'ejs';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setBaseViewsDir(join('__dirname', '../../fe/public'));
  app.engine('html', ejs.renderFile);
  app.setViewEngine('html');
  await app.listen(3000);
}
bootstrap();
