import { join } from 'path';
import * as fs from 'fs';
export class CommonFunction {
    fileAccess(reqObj: any, type: string): any {
        let contentType: string;
        let isLossy: boolean = false;
        // switch (reqObj.format) {
        //     case 'jpeg':
        //         contentType = 'image/jpeg';
        //         isLossy = true;
        //         break;
        //     case 'gif':
        //         contentType = 'image/gif';
        //         break;
        //     case 'webp':
        //         contentType = 'image/webp';
        //         isLossy = true;
        //         break;
        //     case 'png':
        //         contentType = 'image/png';
        //         break;
        //     case 'avif':
        //         contentType = 'image/avif';
        //         isLossy = true;
        //         break;
        //     default:
        //         contentType = 'image/jpeg';
        //         isLossy = true;
        // }

        const fileName: string = `name=${reqObj.name}&width=${reqObj.width}&height=${reqObj.height}&quality=${reqObj.quality}.${reqObj.format}`;
        console.log(fileName);
        console.log(reqObj);
        const accessFolder = `../../uploads/${type}/${fileName}`;
        const imagePath = join(__dirname, accessFolder);
        console.log(imagePath);
        if (fs.existsSync(imagePath)) {
            return { message: imagePath, valid: true, fileName };
        } else {
            return { message: imagePath, valid: false, fileName };
        }
    }
}
