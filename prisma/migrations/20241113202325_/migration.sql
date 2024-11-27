/*
  Warnings:

  - You are about to drop the column `specialties` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "specialties";

-- CreateTable
CREATE TABLE "_SpecialtyToUser" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_SpecialtyToUser_AB_unique" ON "_SpecialtyToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_SpecialtyToUser_B_index" ON "_SpecialtyToUser"("B");

-- AddForeignKey
ALTER TABLE "_SpecialtyToUser" ADD CONSTRAINT "_SpecialtyToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "specialties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SpecialtyToUser" ADD CONSTRAINT "_SpecialtyToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
