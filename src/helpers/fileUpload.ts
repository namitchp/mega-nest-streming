import { diskStorage } from "multer";
import { basename, extname } from "path";

export function imageUpload(filePath: string, fileSize: number) {
    return {
        storage: diskStorage({
            destination: function (req: any, file: any, cb: any) {
                // Uploads is the Upload_folder_name path
                cb(null, filePath);
            },
            // dest: './uploads/',
            filename: function (req: any, file: any, cb: any) {
                const ext = extname(file.originalname);
                const filename = basename(file.originalname, ext);
                cb(null, filename + '-' + Date.now() + ext);
            },
        }),
        // file size
        limits: { fileSize: 1024 * 1024 * fileSize },
        fileFilter: function (req: any, file: any, cb: any) {
            const filetypes = /jpeg|jpg|png|pdf|mp4|audio|mp3|wav/;
            const mimetype = filetypes.test(file.mimetype);
            const extnam = filetypes.test(
                extname(file.originalname).toLowerCase(),
            );
            if (mimetype && extnam) {
                return cb(null, true);
            }
            // if (mimetype) {
            //     return cb(null, true);
            // }
            cb(
                'Error: File upload only supports the ' +
                'following filetypes - ' +
                filetypes,
            );
        },
    }
}