import { Prisma } from "@prisma/client";
import {
  createNewOutfit,
  getFirstCurrentlyScannedOutfit,
  submitOutfit,
  updateCurrentlyScannedOutfit,
} from "../service/output.service";

export const updateCurrentlyScannedOutfitHandler = async (
  data: Prisma.OutfitUpdateInput
) => {
  try {
    let id: string;

    const currentlyScannedOutfit = await getFirstCurrentlyScannedOutfit();
    if (!currentlyScannedOutfit) {
      const newOutfit = await createNewOutfit(data as Prisma.OutfitCreateInput);
      id = newOutfit.id;
    } else {
      id = currentlyScannedOutfit.id;
    }

    const outfit = await updateCurrentlyScannedOutfit(
      id,
      data
    );
    return outfit;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const submitOutfitHandler = async (id: string) => {
  const outfit = await submitOutfit(id);
  return outfit;
};

export const createOutfitHandler = async (data: Prisma.OutfitCreateInput) => {
  const outfit = await createNewOutfit(data);
  return outfit;
};
