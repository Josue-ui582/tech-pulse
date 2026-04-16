/*
  Warnings:

  - You are about to drop the column `Unlike` on the `News` table. All the data in the column will be lost.
  - You are about to drop the column `like` on the `News` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ReactionType" AS ENUM ('Like', 'Unlike');

-- AlterTable
ALTER TABLE "News" DROP COLUMN "Unlike",
DROP COLUMN "like";

-- CreateTable
CREATE TABLE "Reaction" (
    "id" TEXT NOT NULL,
    "type" "ReactionType" NOT NULL,
    "userId" TEXT NOT NULL,
    "newsId" TEXT NOT NULL,

    CONSTRAINT "Reaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Reaction_userId_newsId_key" ON "Reaction"("userId", "newsId");

-- AddForeignKey
ALTER TABLE "Reaction" ADD CONSTRAINT "Reaction_newsId_fkey" FOREIGN KEY ("newsId") REFERENCES "News"("id") ON DELETE CASCADE ON UPDATE CASCADE;
