import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) {}

  use(req: Request & { data: UserData }, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const data = verify(
        token,
        this.configService.getOrThrow('JWT_SECRET_KEY'),
      );
      req.data = JSON.parse(JSON.stringify(data));
    } catch (error) {
      console.log(error);
      return res.status(400).send('Token Inválido');
    }

    next();
  }
}

export type UserData = {
  name: string;
  email: string;
};
