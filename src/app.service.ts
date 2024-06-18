import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createWorker } from 'tesseract.js';
import { v4 } from 'uuid';

@Injectable()
export class AppService {
  private readonly s3Client = new S3Client({
    region: this.configService.getOrThrow('AWS_S3_REGION'),
  });
  constructor(private readonly configService: ConfigService) {}

  async extractText(urlImage: string): Promise<string> {
    const worker = await createWorker('eng');
    const ret = await worker.recognize(urlImage);
    await worker.terminate();
    return ret.data.text;
  }

  async uploadImage(fileName: string, file: Buffer) {
    const name = `${v4()}-${fileName}`;

    try {
      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: 'paggo-bucker',
          Key: name,
          Body: file,
          ACL: 'public-read',
        }),
      );
    } catch (error) {
      throw new HttpException(error.Code, error.$metadata.httpStatusCode);
    }

    const urlImage = `${this.configService.getOrThrow('BASE_URL')}${name}`;

    return urlImage;
  }
}
