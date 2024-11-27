import { PrismaClient, Role, User } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export const createUser = async (username: string, password: string, role: Role): Promise<{ message: string; user?: User }> => {
  // Verifica se todos os campos estão preenchidos
  if (!username || !password || !role) {
    return { message: 'Campos obrigatórios não preenchidos ou incorretos.' };
  }

  // Verifica se o usuário já existe
  const existingUser = await prisma.user.findUnique({
    where: { username },
  });

  if (existingUser) {
    return { message: 'O arquiteto já está cadastrado. Por favor, verifique as informações.', user: existingUser };
  }

  // Cria um hash para a senha
  const hashedPassword = await bcrypt.hash(password, 10);

  // Cria o novo usuário
  const newUser = await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
      role,
    },
  });

  return { message: 'Arquiteto criado com sucesso.', user: newUser };
};

export const getUserById = async (id: string): Promise<User | null> => {
  return prisma.user.findUnique({ where: { id } });
};

export const getAllUsers = async (): Promise<User[]> => {
  return prisma.user.findMany();
};
