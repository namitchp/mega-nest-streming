import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { exec } from 'child_process';
import sharp from 'sharp';

console.log('PORT:', process.env.PORT);
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  sharp('src/assets/1.jpg');
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
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
