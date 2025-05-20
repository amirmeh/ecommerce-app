/*
  Warnings:

  - You are about to drop the column `cookieId` on the `Cart` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[guestId]` on the table `Cart` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "cookieId",
ADD COLUMN     "guestId" TEXT;

-- CreateTable
CREATE TABLE "Guest" (
    "id" TEXT NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Guest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cart_guestId_key" ON "Cart"("guestId");

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_guestId_fkey" FOREIGN KEY ("guestId") REFERENCES "Guest"("id") ON DELETE SET NULL ON UPDATE CASCADE;
