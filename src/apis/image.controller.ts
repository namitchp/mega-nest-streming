import { Controller, Get } from '@nestjs/common';
@Controller('/image')
export class ImageController {
    @Get('')
    imageCompress() {
        return 'Image Compressed';
    }
}
