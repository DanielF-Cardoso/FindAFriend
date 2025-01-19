/*
  Warnings:

  - You are about to drop the column `name` on the `pets` table. All the data in the column will be lost.
  - Added the required column `petName` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pets" DROP COLUMN "name",
ADD COLUMN     "petName" TEXT NOT NULL;
