import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { exec } from 'child_process';

// console.log('PORT:', process.env.PORT);
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  exec('ls -l', (err, stdout, stderr) => {

    if (err) {
      console.error(err);
      return;
    }

    if (stderr) {
      console.error(stderr);
      return;
    }
    console.log(stdout);
  });
  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
