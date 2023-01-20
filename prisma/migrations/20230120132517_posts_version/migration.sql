/*
  Warnings:

  - You are about to drop the column `content` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "content",
ADD COLUMN     "contents" TEXT[],
ADD COLUMN     "thumbnail" TEXT NOT NULL DEFAULT '';
