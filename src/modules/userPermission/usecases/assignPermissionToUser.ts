import prisma from '../../../utils/prisma/prismaClient';

export async function assignPermissionToUser(userId: string, permissionId: string) {
  return prisma.userPermission.create({
    data: {
      userId,
      permissionId,
    },
  });
}
