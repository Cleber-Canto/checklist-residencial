import { PrismaClient, Role, User } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export const createUser = async (username: string, password: string, role: Role): Promise<User> => {
  const hashedPassword = await bcrypt.hash(password, 10);

  return prisma.user.create({
    data: {
      username,
      password: hashedPassword,
      role,
    },
  });
};

export const getUserById = async (id: string): Promise<User | null> => {
  return prisma.user.findUnique({ where: { id } });
};

export const getAllUsers = async (): Promise<User[]> => {
  return prisma.user.findMany();
};
