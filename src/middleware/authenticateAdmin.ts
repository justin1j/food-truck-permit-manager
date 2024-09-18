import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).send('Unauthorized');
  }
  try {
    const decoded = jwt.verify(token, 'your_secret_key') as { adminId: number };
    req.adminId = decoded.adminId;
    next();
  } catch (err) {
    res.status(401).send('Unauthorized');
  }
};
