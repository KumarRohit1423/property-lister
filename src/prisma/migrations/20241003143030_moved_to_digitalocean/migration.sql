/*
  Warnings:

  - Made the column `description` on table `Property` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Property" ALTER COLUMN "description" SET NOT NULL;
