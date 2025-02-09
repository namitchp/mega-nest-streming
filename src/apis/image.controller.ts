import { Controller, Get, Query, Req, Res } from '@nestjs/common';
import { ImageService } from '../core/services/image.service';
import { VideoStremingService } from '../core/services/video.service';
import { Response } from 'express';
interface GetImage {
    name: string,
    width: string,
    height: string,
    quality: string,
    format: string,
}

@Controller('/image')
export class ImageController {
    constructor(
        private imageService: ImageService,
        private readonly videoStremingService: VideoStremingService,
    ) { }

    @Get('')
    imageCompress(@Query() query: GetImage, @Res() res: Response): any {

        return this.imageService.imageGet(query, res);
        // return { message: 'Image Compressed' };
    }
}
