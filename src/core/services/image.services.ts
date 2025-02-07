import { Injectable } from '@nestjs/common';

@Injectable()
export class ImageService {
    imageCompress(): string {
        return 'Image Compressed';
    }
}
