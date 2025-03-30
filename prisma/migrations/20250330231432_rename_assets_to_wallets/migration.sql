/*
  Warnings:

  - You are about to drop the column `asset_id` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the `Asset` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `wallet_id` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "WalletType" AS ENUM ('WALLET', 'CARD', 'BANK_ACCOUNT', 'LOAN', 'OTHER');

-- DropForeignKey
ALTER TABLE "Asset" DROP CONSTRAINT "Asset_currency_id_fkey";

-- DropForeignKey
ALTER TABLE "Asset" DROP CONSTRAINT "Asset_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_asset_id_fkey";

-- DropIndex
DROP INDEX "Transaction_asset_id_idx";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "asset_id",
ADD COLUMN     "wallet_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "Asset";

-- DropEnum
DROP TYPE "AssetType";

-- CreateTable
CREATE TABLE "Wallet" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "balance" DECIMAL(12,2) NOT NULL,
    "user_id" TEXT NOT NULL,
    "currency_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Wallet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Transaction_wallet_id_idx" ON "Transaction"("wallet_id");

-- AddForeignKey
ALTER TABLE "Wallet" ADD CONSTRAINT "Wallet_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wallet" ADD CONSTRAINT "Wallet_currency_id_fkey" FOREIGN KEY ("currency_id") REFERENCES "Currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_wallet_id_fkey" FOREIGN KEY ("wallet_id") REFERENCES "Wallet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
