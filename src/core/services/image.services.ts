import { HttpCode, HttpStatus, Injectable } from '@nestjs/common';
import * as sharp from 'sharp';
import { CommonFunction } from 'src/helpers/common';
interface GetImage {
    name: string;
    width: string;
    height: string;
    quality: string;
    format: string;
}
@Injectable()
export class ImageService extends CommonFunction {
    imageGet(query: GetImage, res: any): any {
        const imagePath = super.fileAccess(query, 'transformed');
        if (imagePath.valid) {
            return this.transformedImage(imagePath.message, res);
        } else {
            const imagePath = super.fileAccess(query, 'original');
            console.log(imagePath);
            if (imagePath.valid) {
                return this.transformedImage(imagePath.message, res);
            } else {
                res.status(HttpStatus.NOT_FOUND).send({ message: 'Image not found' });
            }
        }
    }
    async originalImage(query: GetImage, imagePath: any, res: any): Promise<any> {
        //    const imagePath = super.fileAccess(query, 'original');
        console.log(imagePath);
        let contentType: string;
        let isLossy: boolean = false;
        switch (query.format) {
            case 'jpeg':
                contentType = 'jpeg';
                isLossy = true;
                break;
            case 'gif':
                contentType = 'gif';
                break;
            case 'webp':
                contentType = 'webp';
                isLossy = true;
                break;
            case 'png':
                contentType = 'png';
                break;
            case 'avif':
                contentType = 'avif';
                isLossy = true;
                break;
            default:
                contentType = 'jpeg';
                isLossy = true;
        }
        //   which folder you want to save the image
        const directoryPathOriginal = this.fetchDirectory('original');
        let transformedImage = sharp(`${directoryPathOriginal}/${query.name}`, {
            failOn: 'none',
            animated: true,
        });
        const imageMetadata = await transformedImage.metadata();
        const resizingOptions = {
            width: +query.width,
            height: +query.height,
        };
        transformedImage = transformedImage.resize(resizingOptions);
        if (imageMetadata.orientation) transformedImage = transformedImage.rotate();
        if (query.quality !== 'auto' && isLossy) {
            transformedImage = transformedImage.toFormat(
                contentType as keyof sharp.FormatEnum,
                { quality: parseInt(query.quality.toString()) },
            );
        } else {
            transformedImage = transformedImage.toFormat(
                contentType as keyof sharp.FormatEnum,
            );
        }
        // transformedImage = transformedImage.toFormat(contentType as keyof sharp.FormatEnum, {
        //     quality: parseInt(query.quality.toString()),
        // });
        const directoryPathTransformed = this.fetchDirectory('transformed');
        transformedImage.toFile(
            `${directoryPathTransformed}/${imagePath.fileName}`,
            (err, info) => {
                if (err) {
                    console.log(err);
                }
                this.transformedImage(
                    `${directoryPathTransformed}/${imagePath.fileName}`,
                    res,
                );
            },
        );
    }

    transformedImage(imagePath: string, res: any): any {
        return res.sendFile(imagePath, (err: any) => {
            if (err) {
                res.status(404).send('Image not found');
            }
        });
    }
}
