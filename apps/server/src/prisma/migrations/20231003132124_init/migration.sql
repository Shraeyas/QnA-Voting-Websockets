/*
  Warnings:

  - A unique constraint covering the columns `[questionId,userId]` on the table `Upvote` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Upvote_questionId_userId_key" ON "Upvote"("questionId", "userId");
