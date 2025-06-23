import { LowerTypes, PrismaClient, UpperTypes } from "@prisma/client";
import { createOutfitHandler, updateCurrentlyScannedOutfitHandler } from "../src/handler/output.handler";

const prisma = new PrismaClient();

async function createAndUpdateOutfitWithRedPants() {
  try {
    // // Step 1: Create a new outfit
    // console.log("🔄 Step 1: Creating new outfit...");
    // const newOutfit = await createOutfitHandler({
    //   currentlyScanned: true
    // });

    // console.log("✅ Successfully created new outfit:");
    // console.log("Outfit ID:", newOutfit.id);
    // console.log("Currently scanned:", newOutfit.currentlyScanned);
    // console.log("Created at:", newOutfit.createdAt);

    // Step 2: Update the outfit with red pants
    console.log("\n🔄 Step 2: Updating outfit with red pants...");
    const updatedOutfit = await updateCurrentlyScannedOutfitHandler({
      lower: LowerTypes.PANTS,
      lowerColor: "BLUE",
      upper: UpperTypes.TSHIRT,
      upperColor: "BLUE"
    });

    console.log("✅ Successfully updated outfit with red pants:");
    console.log("Outfit ID:", updatedOutfit.id);
    console.log("Lower item:", updatedOutfit.lower);
    console.log("Lower color:", updatedOutfit.lowerColor);
    console.log("Currently scanned:", updatedOutfit.currentlyScanned);
    console.log("Updated at:", updatedOutfit.updatedAt);

    return updatedOutfit;
  } catch (error) {
    console.error("❌ Error in create/update process:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the script
createAndUpdateOutfitWithRedPants()
  .then(() => {
    console.log("\n🎉 Script completed successfully!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("💥 Script failed:", error);
    process.exit(1);
  });
