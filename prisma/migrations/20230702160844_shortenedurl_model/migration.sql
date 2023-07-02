-- CreateTable
CREATE TABLE "ShortenedUrl" (
    "id" STRING NOT NULL,
    "shortenedId" STRING NOT NULL,
    "customId" STRING,
    "url" STRING NOT NULL,
    "user_id" STRING NOT NULL,

    CONSTRAINT "ShortenedUrl_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ShortenedUrl_customId_key" ON "ShortenedUrl"("customId");

-- AddForeignKey
ALTER TABLE "ShortenedUrl" ADD CONSTRAINT "ShortenedUrl_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
