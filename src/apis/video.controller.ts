import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { VideoStremingService } from '../core/services/video.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageUpload } from 'src/helpers/fileUpload';
// import { StremingService } from 'src/core/services/video.service';
@Controller('/video')
export class VideoController {
  constructor(private readonly videoStreamingService: VideoStremingService) { }
  // console.log(common.imageUpload('uploads', 10));

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file', imageUpload('uploads/video', 10)))
  // async getVideo(@Body() body: any): Promise<void> {
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.videoStreamingService.uploadVideo(file);
  }
}
