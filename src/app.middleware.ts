import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

export async function AuthMiddleware(
  req: Request & { data: UserData },
  res: Response,
  next: NextFunction,
) {
  try {
    const JWT_SECRET_KEY = '123456789AAAAAAAA';
    const token = req.headers.authorization.split(' ')[1];
    const data = verify(token, JWT_SECRET_KEY);
    req.data = JSON.parse(JSON.stringify(data));
  } catch (error) {
    console.log(error);
    return res.status(400).send('Token Inválido');
  }

  next();
}

export type UserData = {
  name: string;
  email: string;
};
