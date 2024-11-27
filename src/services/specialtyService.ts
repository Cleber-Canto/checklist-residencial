import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createSpecialty = async (name: string) => {
  return prisma.specialty.create({
    data: { name },
  });
};

export const getAllSpecialties = async () => {
  return prisma.specialty.findMany();
};
