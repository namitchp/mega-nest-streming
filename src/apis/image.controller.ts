import { Controller, Get, Req } from '@nestjs/common';
import { ImageService } from '../core/services/image.services';
import { VideoStremingService } from '../core/services/video.service';
import { Request } from 'express';
@Controller('/image')
export class ImageController {
    constructor(
        private imageService: ImageService,
        private readonly videoStremingService: VideoStremingService,
    ) { }
    @Get('')
    imageCompress(@Req() req: Request): any {
        console.log(req.query);
        return this.imageService.imageCompress(req.query);

        // return { message: 'Image Compressed' };
    }
    @Get('/video')
    getHello(): string {
        return this.videoStremingService.getHello();
    }
}
