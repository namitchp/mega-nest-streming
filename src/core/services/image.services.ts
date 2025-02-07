import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { join } from 'path';
import { CommonFunction } from 'src/helpers/common';

@Injectable()
export class ImageService extends CommonFunction {
    imageCompress(req: any): any {
        console.log(req);
        const imagePath = super.fileAccess(req.name);
        // const imagePath = join(__dirname, '../../..//uploads/' + req.name);
        console.log(imagePath);
        return imagePath;
    }
}
