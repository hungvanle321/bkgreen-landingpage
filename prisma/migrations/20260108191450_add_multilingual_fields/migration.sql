-- AlterTable
ALTER TABLE "Page" ADD COLUMN     "content_en" TEXT,
ADD COLUMN     "content_fr" TEXT,
ADD COLUMN     "metaDescription_en" TEXT,
ADD COLUMN     "metaDescription_fr" TEXT,
ADD COLUMN     "metaTitle_en" TEXT,
ADD COLUMN     "metaTitle_fr" TEXT,
ADD COLUMN     "title_en" TEXT,
ADD COLUMN     "title_fr" TEXT;

-- AlterTable
ALTER TABLE "TeamMember" ADD COLUMN     "bio_en" TEXT,
ADD COLUMN     "bio_fr" TEXT,
ADD COLUMN     "name_en" TEXT,
ADD COLUMN     "name_fr" TEXT,
ADD COLUMN     "position_en" TEXT,
ADD COLUMN     "position_fr" TEXT;
