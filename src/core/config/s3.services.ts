import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
    S3Client,
    PutObjectCommand,
    DeleteObjectCommand,
    GetObjectCommand,
} from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class S3ConfigService {
    public client: S3Client;
    private bucketName = this.configService.get('S3_BUCKET_NAME');

    constructor(
        private readonly configService: ConfigService,
    ) {
        const s3_region = this.configService.get('S3_REGION');

        if (!s3_region) {
            throw new Error('S3_REGION not found in environment variables');
        }

        console.log(process.env.S3_SECRET_ACCESS_KEY)
        this.client = new S3Client({
            region: s3_region,
            credentials: {
                accessKeyId: process.env.S3_ACCESS_KEY,
                secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
            },
            forcePathStyle: true,
        });

    }
}
