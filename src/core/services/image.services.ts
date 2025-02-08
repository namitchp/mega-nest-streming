import { Injectable } from '@nestjs/common';
import { CommonFunction } from 'src/helpers/common';
interface GetImage {
    name: string;
    width: number;
    height: number;
    quality: number;
    format: string;
}
@Injectable()
export class ImageService extends CommonFunction {
    imageGet(query: GetImage, res: any): any {
        const imagePath = super.fileAccess(query, 'transformed');
        if (imagePath.valid) {
            return this.transformedImage(imagePath.message, res);

        } else {
            const image = {}
            // this.originalImage();
        }
    }
    originalImage(req: any): any {
        const imagePath = super.fileAccess(req.name, 'type');
        return imagePath;
    }
    transformedImage(imagePath: string, res: any): any {
        return res.sendFile(imagePath, (err: any) => {
            if (err) {
                res.status(404).send('Image not found');
            }
        });
    }
}
