/*
  Warnings:

  - Added the required column `address` to the `ongs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zipcode` to the `ongs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ongs" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "zipcode" TEXT NOT NULL;
