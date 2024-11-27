import prisma from '../utils/prisma/prismaClient';

export async function assignPermissionToUser(userId: string, permissionId: string) {
  return prisma.userPermission.create({
    data: {
      userId,
      permissionId,
    },
  });
}

export async function getUserPermissions(userId: string) {
  return prisma.userPermission.findMany({
    where: { userId },
  });
}
