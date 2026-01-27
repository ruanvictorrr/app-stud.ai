/*
  Warnings:

  - You are about to drop the column `tokenHash` on the `PasswordResetToken` table. All the data in the column will be lost.
  - You are about to drop the column `usedAt` on the `PasswordResetToken` table. All the data in the column will be lost.
  - You are about to drop the column `emailVerified` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `stripeCustomerId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Subscription` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VerificationToken` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[token]` on the table `PasswordResetToken` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `token` to the `PasswordResetToken` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "Subscription" DROP CONSTRAINT "Subscription_userId_fkey";

-- DropIndex
DROP INDEX "PasswordResetToken_expiresAt_idx";

-- DropIndex
DROP INDEX "PasswordResetToken_tokenHash_key";

-- DropIndex
DROP INDEX "PasswordResetToken_userId_idx";

-- DropIndex
DROP INDEX "Session_expires_idx";

-- DropIndex
DROP INDEX "Session_userId_idx";

-- DropIndex
DROP INDEX "StudyMaterial_createdAt_idx";

-- DropIndex
DROP INDEX "StudyMaterial_userId_idx";

-- DropIndex
DROP INDEX "Usage_monthKey_idx";

-- DropIndex
DROP INDEX "Usage_userId_idx";

-- DropIndex
DROP INDEX "User_createdAt_idx";

-- DropIndex
DROP INDEX "User_plan_idx";

-- AlterTable
ALTER TABLE "PasswordResetToken" DROP COLUMN "tokenHash",
DROP COLUMN "usedAt",
ADD COLUMN     "token" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "emailVerified",
DROP COLUMN "image",
DROP COLUMN "stripeCustomerId";

-- DropTable
DROP TABLE "Account";

-- DropTable
DROP TABLE "Subscription";

-- DropTable
DROP TABLE "VerificationToken";

-- CreateIndex
CREATE UNIQUE INDEX "PasswordResetToken_token_key" ON "PasswordResetToken"("token");
