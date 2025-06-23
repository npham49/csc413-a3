-- CreateEnum
CREATE TYPE "UpperTypes" AS ENUM ('SHIRT', 'TSHIRT');

-- CreateEnum
CREATE TYPE "LowerTypes" AS ENUM ('PANTS', 'BLOUSE');

-- CreateTable
CREATE TABLE "Outfit" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "currentlyScanned" BOOLEAN NOT NULL DEFAULT true,
    "upper" "UpperTypes" NOT NULL,
    "lower" "LowerTypes" NOT NULL,
    "upperColor" TEXT NOT NULL,
    "lowerColor" TEXT NOT NULL,

    CONSTRAINT "Outfit_pkey" PRIMARY KEY ("id")
);
