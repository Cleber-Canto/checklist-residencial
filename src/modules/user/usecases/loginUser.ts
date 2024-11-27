import prisma from '../../../utils/prisma/prismaClient';
import bcrypt from 'bcryptjs';
import { generateToken } from '../../../utils/token';

export async function loginUser(username: string, password: string) {
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid username or password');
  }

  const token = generateToken({ userId: user.id, role: user.role });
  return { token, user };
}
