import prisma from '../../../utils/prisma/prismaClient';

export async function createChecklist(contractId: string, tasks: { name: string }[]) {
  const checklist = await prisma.checklist.create({
    data: {
      contractId,
    },
  });

  await prisma.task.createMany({
    data: tasks.map(task => ({ ...task, checklistId: checklist.id })),
  });

  return checklist;
}
