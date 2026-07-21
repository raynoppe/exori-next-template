-- CreateEnum
CREATE TYPE "CatalogItemType" AS ENUM ('BLOCK', 'PAGE_LAYOUT', 'NAVIGATION');

-- CreateTable
CREATE TABLE "CatalogItem" (
    "id" TEXT NOT NULL,
    "type" "CatalogItemType" NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "family" TEXT,
    "componentId" TEXT,
    "previewUrl" TEXT,
    "screenshotUrl" TEXT,
    "tags" TEXT[],
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "status" "EntryStatus" NOT NULL DEFAULT 'PUBLISHED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CatalogItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CatalogItem_type_slug_key" ON "CatalogItem"("type", "slug");

-- CreateIndex
CREATE INDEX "CatalogItem_type_status_idx" ON "CatalogItem"("type", "status");
