import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createChecklist = async (contractId: string, tasks: { name: string }[]) => {
  const checklist = await prisma.checklist.create({
    data: {
      contractId,
    },
  });

  await prisma.task.createMany({
    data: tasks.map(task => ({ ...task, checklistId: checklist.id })),
  });

  return checklist;
};

export const getAllChecklists = async () => {
  return prisma.checklist.findMany();
};
