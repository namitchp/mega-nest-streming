import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './apis/users.controller';
import { VideoController } from './apis/video.controller';
import { ImageController } from './apis/image.controller';
import { ImageService } from './core/services/image.services';
import { VideoStremingService } from './core/services/video.service';
// import { UsersModule } from './users/users.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  })],
  // imports: [UsersModule],
  controllers: [
    AppController,
    UserController,
    VideoController,
    ImageController,
  ],
  providers: [AppService, ImageService, VideoStremingService],
  exports: [],
})
export class AppModule { }
