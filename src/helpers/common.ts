import { join } from 'path';
import * as fs from 'fs';

export class CommonFunction {
    fileAccess(fileName: string): any {
        console.log(fileName);
        const imagePath = join(__dirname, '../../uploads/' + fileName);
        console.log(imagePath);
        if (fs.existsSync(imagePath)) {
            return { message: imagePath, valid: true };
        } else {
            return { message: 'File Not exist', valid: false };
        }
    }
}
