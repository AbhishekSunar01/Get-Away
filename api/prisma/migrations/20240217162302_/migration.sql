/*
  Warnings:

  - You are about to alter the column `price` on the `property` table. The data in that column could be lost. The data in that column will be cast from `Double` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `property` MODIFY `price` VARCHAR(191) NOT NULL;
