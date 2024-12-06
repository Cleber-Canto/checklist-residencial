import { PrismaClient, User, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Função para autenticar usuário e gerar token JWT
export const authenticateUser = async (username: string, password: string): Promise<{ token: string; user: User }> => {
  const user = await prisma.user.findUnique({
    where: { username },
    include: { specialty: true }, // Correção aqui
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid username or password');
  }

  const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
    expiresIn: '1h',
  });

  return { token, user };
};

// Outras funções permanecem inalteradas
export const createUser = async (username: string, password: string, role: Role): Promise<User> => {
  // Verificar se o nome de usuário já existe
  const existingUser = await prisma.user.findUnique({
    where: { username },
  });

  if (existingUser) {
    throw new Error('O nome de usuário já está em uso. Por favor, escolha um nome de usuário diferente.');
  }

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
  return prisma.user.findUnique({
    where: { id },
    include: { specialty: true }, // Correção aqui
  });
};

export const getAllUsers = async (): Promise<User[]> => {
  return prisma.user.findMany({
    include: { specialty: true }, // Correção aqui
  });
};

export const updateUser = async (id: string, username?: string, password?: string, role?: Role): Promise<User> => {
  const data: Partial<{ username: string; password: string; role: Role }> = {};
  if (username) data.username = username;
  if (password) data.password = await bcrypt.hash(password, 10);
  if (role) data.role = role;

  return prisma.user.update({
    where: { id },
    data,
  });
};

export const deleteUser = async (id: string): Promise<User> => {
  return prisma.user.delete({
    where: { id },
  });
};
