/*
  Warnings:

  - You are about to drop the column `gymId` on the `check_in` table. All the data in the column will be lost.
  - Added the required column `gym_id` to the `check_in` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "check_in" DROP CONSTRAINT "check_in_gymId_fkey";

-- AlterTable
ALTER TABLE "check_in" DROP COLUMN "gymId",
ADD COLUMN     "gym_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "check_in" ADD CONSTRAINT "check_in_gym_id_fkey" FOREIGN KEY ("gym_id") REFERENCES "gyms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
