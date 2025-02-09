import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { exec } from 'child_process';
import * as sharp from 'sharp';
import { json, urlencoded, static as serveStatic } from 'express';
import { join } from 'path';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ limit: '50mb', extended: false }));
  app.use(serveStatic(join(__dirname, '../uploads')));
  // const imagePath = join(__dirname, '../uploads');
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
