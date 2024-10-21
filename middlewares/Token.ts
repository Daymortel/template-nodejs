import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export class Token {
  public handle(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies['token'];
  
    if (!token) {
      return res.redirect('/auth/signin');
    }
    try {
      jwt.verify(token, 'key');
      next();
    } catch (err) {
      res.status(400).send(err.message);
    }
  }
}
