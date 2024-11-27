import prisma from '../../../utils/prisma/prismaClient';

export async function getTasksByChecklist(checklistId: string) {
  return prisma.task.findMany({
    where: { checklistId },
  });
}
