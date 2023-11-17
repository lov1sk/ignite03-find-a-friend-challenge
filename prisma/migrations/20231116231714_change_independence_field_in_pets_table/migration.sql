/*
  Warnings:

  - You are about to drop the column `independenceLevel` on the `pets` table. All the data in the column will be lost.
  - Added the required column `independence` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pets" DROP COLUMN "independenceLevel",
ADD COLUMN     "independence" TEXT NOT NULL;
