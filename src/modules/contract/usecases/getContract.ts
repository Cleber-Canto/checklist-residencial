import prisma from '../../../utils/prisma/prismaClient';

export async function getAllContracts() {
  return prisma.contract.findMany();
}
