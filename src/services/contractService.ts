import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createContract = async (clientId: string, architectId: string, description: string) => {
  return prisma.contract.create({
    data: {
      clientId,
      architectId,
      description,
    },
  });
};

export const getAllContracts = async () => {
  return prisma.contract.findMany();
};
