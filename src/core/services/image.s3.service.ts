import { HttpStatus, Injectable } from '@nestjs/common';
import { join } from 'path';
import * as sharp from 'sharp';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import * as fs from 'fs';
import { S3ConfigService } from '../config/s3.services';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
interface GetImage {
    name: string;
    width: string;
    height: string;
    quality: string;
    format: string;
}
@Injectable()
export class ImageServiceS3 {
    constructor(
        private readonly s3ConfigService: S3ConfigService
    ) { }
    async imageGetS3(query: GetImage, res: any): Promise<any> {
        const getOriginalImageCommand = new GetObjectCommand({ Bucket: 'megaprojectoriginal', Key: 'UserImage_08222024090814PM.jpg' });
        const getOriginalImageCommandOutput = await this.s3ConfigService.client.send(
            getOriginalImageCommand,
        );
        //     const putImageCommand = new PutObjectCommand({
        //         Body: transformedImage,
        //         Bucket: S3_TRANSFORMED_IMAGE_BUCKET,
        //         Key: originalImagePath + '/' + operationsPrefix,
        //         ContentType: contentType,
        //         CacheControl: TRANSFORMED_IMAGE_CACHE_TTL,
        //     })

        //    const pushImage= await this.s3ConfigService.client.send(putImageCommand);
        console.log(`Got response from S3 for `);
        console.log(await getOriginalImageCommandOutput.Body.transformToByteArray())
        res.status(201).send("hello")

        return

        const imagePath = this.fileAccess(query, 'transformed');
        if (imagePath.valid) {
            return this.transformedImageFun(imagePath.message, res);
        } else {
            const imagePath = this.fileAccess(query, 'original');
            if (imagePath.valid) {
                return this.originalImageS3(query, imagePath, res);
            } else {
                res.status(HttpStatus.NOT_FOUND).send({ message: 'Image not found' });
            }
        }
    }
    async originalImageS3(
        query: GetImage,
        imagePath: any,
        res: any,
    ): Promise<any> {
        let contentType: string;
        let isLossy: boolean = false;
        switch (query.format) {
            case 'jpeg':
                contentType = 'image/jpeg';
                isLossy = true;
                break;
            case 'gif':
                contentType = 'image/gif';
                break;
            case 'webp':
                contentType = 'image/webp';
                isLossy = true;
                break;
            case 'png':
                contentType = 'image/png';
                break;
            case 'avif':
                contentType = 'image/avif';
                isLossy = true;
                break;
            default:
                contentType = 'image/jpeg';
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
            // fit: sharp.fit.contain,
            // position: sharp.strategy.attention,
            // background: 'red',
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
        const transformedImageBuffer = await transformedImage.toBuffer();
        sharp(transformedImageBuffer).toFile(
            `${directoryPathTransformed}/${imagePath.fileName}`,
            (err) => {
                if (err) {
                    res
                        .status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .send({ message: 'Image not found' });
                }
                this.transformedImageFun(
                    `${directoryPathTransformed}/${imagePath.fileName}`,
                    res,
                );
            },
        );
    }

    transformedImageFun(imagePath: string, res: any): any {
        return res.status(HttpStatus.OK).sendFile(imagePath, (err: any) => {
            if (err) {
                res.status(HttpStatus.NOT_FOUND).send('Image not found');
            }
        });
    }

    fetchDirectory(type: string) {
        const imagePath = join(__dirname, `../../../uploads/${type}`);
        return imagePath;
    }

    fileAccess(reqObj: any, type: string): any {
        const fileName: string = `name=${reqObj.name}&width=${reqObj.width}&height=${reqObj.height}&quality=${reqObj.quality}.${reqObj.format}`;
        const accessFolder = `${this.fetchDirectory(type)}/${type === 'original' ? reqObj.name : fileName}`;
        if (fs.existsSync(accessFolder)) {
            return { message: accessFolder, valid: true, fileName };
        } else {
            return { message: accessFolder, valid: false, fileName };
        }
    }
}
