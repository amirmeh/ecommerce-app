-- CreateEnum
CREATE TYPE "ProductCategory" AS ENUM ('MOBILE', 'LAPTOP', 'WATCH', 'OTHER');

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "description" DROP NOT NULL;
