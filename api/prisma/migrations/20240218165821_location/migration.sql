/*
  Warnings:

  - Added the required column `location` to the `Property` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `property` ADD COLUMN `location` VARCHAR(191) NOT NULL;
