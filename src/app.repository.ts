import { Injectable } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class AppRepository {
  constructor(private prisma: PrismaService) {}

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return await this.prisma.user.create({
      data,
    });
  }

  async findUser(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        posts: true,
      },
    });
  }

  async createPost(data: Prisma.UserImagesCreateManyInput) {
    return await this.prisma.userImages.create({
      data,
    });
  }

  async deleteUsers() {
    return await this.prisma.user.deleteMany({});
  }

  async DeleteUserImage() {
    return await this.prisma.userImages.deleteMany({});
  }

  async getAllUsers() {
    return await this.prisma.user.findMany({
      include: {
        posts: true,
      },
    });
  }
}
