import prisma from '../../../utils/prisma/prismaClient';
import bcrypt from 'bcryptjs';
import { generateToken } from '../../../utils/token';

export async function registerClient(username: string, password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
      role: 'CLIENT',
    },
  });
  const token = generateToken({ userId: user.id, role: user.role });
  return { token, user };
}


