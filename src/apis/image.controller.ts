import { Controller, Get, Post, Query, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ImageService } from '../core/services/image.service';
import { query, Response } from 'express';
import { ImageServiceS3 } from '../core/services/image.s3.service';
import { imageUpload } from 'src/helpers/fileUpload';
import { FileInterceptor } from '@nestjs/platform-express';
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
    @Post('/upload')
    @UseInterceptors(
        FileInterceptor('file', imageUpload('uploads/original', 500)),
    )
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        return this.imageService.uploadImageServer(file);
    }
    @Get('/local')
    imageCompress(@Query() query: GetImage, @Res() res: Response): any {
        return this.imageService.imageGet(query, res);
    }
    @Get('/s3/upload')
    imageUploadS3(@Query() query): any {
        return this.imageServiceS3.uploadImageS3(query)
    }
    @Get('/s3/get')
    imageCompressS3(@Query() query: GetImage, @Res() res: Response): any {

        return this.imageServiceS3.imageGetS3(query, res);
    }
}
