import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserController } from "./apis/users.controller";
import { VideoController } from "./apis/video.controller";
import { ImageController } from "./apis/image.controller";
import { ImageService } from "./core/services/image.service";
import { VideoStremingService } from "./core/services/video.service";
import { MulterModule } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { basename, extname } from "path";
import { CommonFunction } from "./helpers/common";
// import { UsersModule } from './users/users.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }),
  ],
  // imports: [UsersModule],
  controllers: [
    AppController,
    UserController,
    VideoController,
    ImageController,
  ],
  providers: [AppService, ImageService, VideoStremingService, CommonFunction],
  exports: [],
})
export class AppModule { }
