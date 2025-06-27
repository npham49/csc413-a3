import { Prisma } from "@prisma/client";
import prisma from "../../prisma/db";

export const getOutfit = async (id: string) => {
  const outfit = await prisma.outfit.findUnique({
    where: { id },
  });
  return outfit;
};

export const getFirstCurrentlyScannedOutfit = async () => {
  const outfit = await prisma.outfit.findFirst({
    where: { currentlyScanned: true },
  });
  return outfit;
};

export const get10RecentlyScannedOutfits = async () => {
  const outfits = await prisma.outfit.findMany({
    orderBy: { createdAt: "desc" },
    take: 10,
  });
  return outfits;
}

export const updateCurrentlyScannedOutfit = async (id: string, data: Prisma.OutfitUpdateInput) => {
  const outfit = await prisma.outfit.update({
    where: { id },
    data,
  });
  return outfit;
}

export const createNewOutfit = async (data: Prisma.OutfitCreateInput) => {
  const outfit = await prisma.outfit.create({
    data,
  });
  return outfit;
}

export const submitOutfit = async (id: string) => {
  const outfit = await prisma.outfit.update({
    where: { id },
    data: { currentlyScanned: false },
  });
  return outfit;
}