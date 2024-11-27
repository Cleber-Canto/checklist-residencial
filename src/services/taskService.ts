import prisma from '../utils/prisma/prismaClient';

export async function addTask(checklistId: string, name: string) {
  return prisma.task.create({
    data: {
      checklistId,
      name,
    },
  });
}

export async function getTasksByChecklist(checklistId: string) {
  return prisma.task.findMany({
    where: { checklistId },
  });
}
