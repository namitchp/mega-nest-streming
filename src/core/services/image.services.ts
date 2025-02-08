import { Injectable } from '@nestjs/common';
import { CommonFunction } from 'src/helpers/common';
@Injectable()
export class ImageService extends CommonFunction {
    imageCompress(req: any, res: any): any {
        const imagePath = super.fileAccess(req.name);
        console.log(imagePath);
        if (imagePath.valid) {
            return res.sendFile(imagePath.message, (err: any) => {
                if (err) {
                    res.status(404).send('Image not found');
                }
            });
        }
    }
}
