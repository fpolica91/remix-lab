/*
  Warnings:

  - You are about to drop the column `userId` on the `Task` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[auth0Id]` on the table `Task` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `auth0Id` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_userId_fkey";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "userId",
ADD COLUMN     "auth0Id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Task_auth0Id_key" ON "Task"("auth0Id");

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_auth0Id_fkey" FOREIGN KEY ("auth0Id") REFERENCES "User"("auth0Id") ON DELETE RESTRICT ON UPDATE CASCADE;
