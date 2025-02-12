import { Controller, Get, Query, Res } from '@nestjs/common';
import { ImageService } from '../core/services/image.service';
import { VideoStremingService } from '../core/services/video.service';
import { Response } from 'express';
import { ImageServiceS3 } from '../core/services/image.s3.service';
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
        private readonly imageServiceS3: ImageServiceS3
        ,
    ) { }

    @Get('')
    imageCompress(@Query() query: GetImage, @Res() res: Response): any {

        return this.imageService.imageGet(query, res);
    }

    @Get('/s3')
    imageCompressS3(@Query() query: GetImage, @Res() res: Response): any {

        return this.imageServiceS3.imageGetS3(query, res);
    }
}
