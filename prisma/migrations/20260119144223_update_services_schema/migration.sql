-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "featured" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "ServiceTranslation" ADD COLUMN     "features" TEXT;
