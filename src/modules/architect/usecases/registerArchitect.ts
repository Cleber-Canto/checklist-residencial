import prisma from '../../../utils/prisma/prismaClient';
import bcrypt from 'bcryptjs';
import { generateToken } from '../../../utils/token';

export async function registerArchitect(username: string, password: string, specialtyId: number) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
      role: 'ARCHITECT',
      specialty: {
        connect: { id: specialtyId },
      },
    },
  });
  const token = generateToken({ userId: user.id, role: user.role });
  return { token, user };
}
