/*
  Warnings:

  - The primary key for the `Capsule` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Capsule" DROP CONSTRAINT "Capsule_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Capsule_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Capsule_id_seq";
