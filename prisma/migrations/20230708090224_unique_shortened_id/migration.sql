/*
  Warnings:

  - A unique constraint covering the columns `[shortenedId]` on the table `ShortenedUrl` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ShortenedUrl_shortenedId_key" ON "ShortenedUrl"("shortenedId");
