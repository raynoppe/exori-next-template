-- CreateEnum
CREATE TYPE "EntryStatus" AS ENUM ('DRAFT', 'PUBLISHED');

-- CreateTable
CREATE TABLE "CollectionEntry" (
    "id" TEXT NOT NULL,
    "collection" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "summary" TEXT,
    "image" TEXT,
    "fields" JSONB,
    "status" "EntryStatus" NOT NULL DEFAULT 'PUBLISHED',
    "ownerId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CollectionEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CollectionEntry_collection_slug_key" ON "CollectionEntry"("collection", "slug");

-- CreateIndex
CREATE INDEX "CollectionEntry_collection_status_idx" ON "CollectionEntry"("collection", "status");

-- AddForeignKey
ALTER TABLE "CollectionEntry" ADD CONSTRAINT "CollectionEntry_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
