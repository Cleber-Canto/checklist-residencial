import prisma from '../utils/prisma/prismaClient';

export async function addPermission(name: string) {
  return prisma.permission.create({
    data: {
      name,
    },
  });
}

export async function getAllPermissions() {
  return prisma.permission.findMany();
}
