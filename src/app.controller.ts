import {
  Controller,
  Delete,
  Get,
  HttpException,
  Post,
  Req,
  Request,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppRepository } from './app.repository';
import { UserData } from './app.middleware';

@Controller('')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly appRepository: AppRepository,
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @Req() request: Request & { data: UserData },
    @UploadedFile() file: Express.Multer.File,
  ): Promise<string> {
    try {
      const { email, name } = request.data;
      let user = await this.appRepository.findUser(email);

      if (user === null) {
        user = await this.appRepository.createUser({ email, name });
      }

      const urlImage = await this.appService.uploadImage(
        file.originalname,
        file.buffer,
      );

      const text = await this.appService.extractText(urlImage);

      const userContent = await this.appRepository.createPost({
        text,
        urlImage,
        userId: user.id,
      });

      console.log(userContent);
      return text;
    } catch (error) {
      console.log(error);
      throw new HttpException('Algo deu errado', 400);
    }
  }

  @Delete('all')
  async deleteUsers() {
    await this.appRepository.DeleteUserImage();
    await this.appRepository.deleteUsers();
    return 'Deleted';
  }

  @Get()
  async getAllUsers() {
    return await this.appRepository.getAllUsers();
  }

  @Get('posts')
  async getAllUserPost(@Req() request: Request & { data: UserData }) {
    const { email } = request.data;

    return await this.appRepository.findUser(email);
  }
}
