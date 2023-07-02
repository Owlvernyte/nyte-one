-- AlterTable
ALTER TABLE "ShortenedUrl" ADD COLUMN     "clicks" INT4 NOT NULL DEFAULT 0;
ALTER TABLE "ShortenedUrl" ADD COLUMN     "views" INT4 NOT NULL DEFAULT 0;
