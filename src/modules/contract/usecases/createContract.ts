import prisma from '../../../utils/prisma/prismaClient';

export async function createContract(clientId: string, architectId: string, description: string) {
  return prisma.contract.create({
    data: {
      clientId,
      architectId,
      description,
    },
  });
}
