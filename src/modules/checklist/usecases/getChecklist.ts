import prisma from '../../../utils/prisma/prismaClient';

export async function getAllChecklists() {
  return prisma.checklist.findMany({
    include: {
      tasks: true,
    },
  });
}
