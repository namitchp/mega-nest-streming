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
  let transformedImage = sharp(imagePath + '/image.jpg', { failOn: 'none', animated: true });
  const imageMetadata = await transformedImage.metadata();
  const resizingOptions = { with: 100, height: 100 };
  // if (operationsJSON['width']) resizingOptions.width = parseInt(operationsJSON['width']);
  // if (operationsJSON['height']) resizingOptions.height = parseInt(operationsJSON['height']);
  // if (resizingOptions) 
  transformedImage = transformedImage.resize(resizingOptions);

  // console.log('metadata:', imageMetadata);
  // console.log('transformedImage:', transformedImage);
  if (imageMetadata.orientation)
    transformedImage = transformedImage.rotate();
  // console.log('transformedImage:', transformedImage);

  // sharp(imagePath + '/image.jpg')
  //   .resize(420, 540)
  //   .toFormat('png', { quality: 100 })
  //   .toFile(imagePath + '/namit.png', (err, info) => {
  //     console.log(info);
  //   });
  // console.log('semiTransparentRedPng:', transformedImage);
  // console.log('sharpData:', sharpData);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
