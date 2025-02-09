import path, { join } from 'path';
import * as fs from 'fs';
import { diskStorage } from 'multer';
import { Injectable } from '@nestjs/common';
@Injectable()
export class CommonFunction {
    fetchDirectory(type: string) {
        const imagePath = join(__dirname, `../../uploads/${type}`);
        return imagePath;
    }

    fileAccess(reqObj: any, type: string): any {
        const fileName: string = `name=${reqObj.name}&width=${reqObj.width}&height=${reqObj.height}&quality=${reqObj.quality}.${reqObj.format}`;
        const accessFolder = `${this.fetchDirectory(type)}/${type === 'original' ? reqObj.name : fileName}`;
        // const imagePath = join(__dirname, accessFolder);
        console.log(accessFolder);
        if (fs.existsSync(accessFolder)) {
            return { message: accessFolder, valid: true, fileName };
        } else {
            return { message: accessFolder, valid: false, fileName };
        }
    }

}
