import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { exec } from 'child_process';
import * as sharp from 'sharp';
import { json, urlencoded, static as serveStatic } from 'express';
import { join } from 'path';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ limit: '50mb', extended: false }));
  app.use(serveStatic(join(__dirname, '../uploads')));
  // sharp('src/assets/1.jpg');
  // exec('ls -l', (err, stdout, stderr) => {

  //   if (err) {
  //     console.error(err);
  //     return;
  //   }

  //   if (stderr) {
  //     console.error(stderr);
  //     return;
  //   }
  //   console.log(stdout);
  // });

  // const sharpData = sharp('image.jpg');
  // Sharp('image.jpg').
  // app.use('/')
  const imagePath = join(__dirname, '../uploads');

  // const transformedImage = sharp(imagePath)
  //   .resize(200, 500)
  //   .toFormat('png')
  //   .toFile(join(__dirname, '../uploads/i.png'))
  //   .toBuffer();
  sharp(imagePath + '/image.jpg')
    .resize(420, 540)
    .toFormat('png', { quality: 100 })
    .toFile(imagePath + '/namit.png', (err, info) => {
      console.log(info);
    });
  // console.log('semiTransparentRedPng:', transformedImage);
  // console.log('sharpData:', sharpData);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
