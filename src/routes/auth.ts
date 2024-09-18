import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

router.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const admin = await prisma.admin.findUnique({
    where: { username },
  });

  if (!admin || !(await bcrypt.compare(password, admin.passwordHash))) {
    return res.status(401).send('Invalid credentials');
  }

  const token = jwt.sign({ adminId: admin.id }, 'your_secret_key', {
    expiresIn: '1h',
  });

  res.json({ token });
});

export default router;
