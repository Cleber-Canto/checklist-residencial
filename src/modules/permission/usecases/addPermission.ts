import prisma from '../../../utils/prisma/prismaClient';

export async function addPermission(name: string) {
  return prisma.permission.create({
    data: {
      name,
    },
  });
}
