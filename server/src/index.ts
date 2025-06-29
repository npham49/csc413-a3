    // src/index.ts
    import express, { Request, Response } from 'express';
    import { SerialPort } from "serialport"; // ✅ Fixed
    import { ReadlineParser } from "@serialport/parser-readline";
    import cors from "cors"
    import { Prisma, LowerTypes, PrismaClient, UpperTypes } from "@prisma/client";

    import { updateCurrentlyScannedOutfitHandler, get10RecentlyScannedOutfitsHandler, submitOutfitHandler } from "./handler/output.handler";
    import { generateStories } from "./helper/generateText";

    const app = express();
    const PORT = process.env.PORT || 3000;
    let currentOutfit: Prisma.OutfitUpdateInput = {
      upper: null,
      lower: null,
      upperColor: null,
      lowerColor: null,

    }

    app.use(cors());

    let clients: Response[] = [];
    app.get('/', (req: Request, res: Response) => {
      res.send('Hello from Express with TypeScript!');
    });

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

  app.get("/stories", async (_: Request, res: Response) => {
    const outfits = await get10RecentlyScannedOutfitsHandler();
    // res.json(outfits);
    // console.log("outfits", outfits);
    const stories = await generateStories(outfits as any);
    console.log("stories", stories);
    res.json(stories);
  });

  // TODO: Add back when connecting to arduino
  // Replace with your correct serial port path
  const arduinoPort = new SerialPort({ path: "/dev/cu.usbmodem11201", baudRate: 9600 }); // ✅ Fixed
  const parser = arduinoPort.pipe(new ReadlineParser({ delimiter: "\n" }));

  parser.on("data", async (line: string) => {
    console.log(">>", line.trim());
    clients.forEach((res) => res.write(`data: ${line.trim()}\n\n`));
    let currentScanned: string = line.trim();
    if (currentScanned.includes("Bottom")) {
      console.log("Bottom");
      currentOutfit.lower = currentScanned.split(" ")[2].toUpperCase() === "PANTS" ? LowerTypes.PANTS : LowerTypes.BLOUSE;
    } else if (currentScanned.includes("Top")) {
      console.log("Top");
      currentOutfit.upper = currentScanned.split(" ")[2].toUpperCase() === "SHIRT" ? UpperTypes.SHIRT : UpperTypes.TSHIRT;
    } else if (currentScanned.includes("0 Color")) {
      currentOutfit.upperColor = currentScanned.split(" ")[2].toUpperCase();
    } else if (currentScanned.includes("1 Color")) {
      currentOutfit.lowerColor = currentScanned.split(" ")[2].toUpperCase();
    } else if (currentScanned.includes("Done")) {
      currentOutfit = await submitOutfitHandler(currentOutfit.id as string);
      console.log(currentOutfit);
      currentOutfit = {
        upper: null,
        lower: null,
        upperColor: null,
        lowerColor: null,
      };
    }
    if (currentOutfit.upper || currentOutfit.lower || currentOutfit.upperColor || currentOutfit.lowerColor) {
      currentOutfit =await updateCurrentlyScannedOutfitHandler(currentOutfit);
    }
    // console.log(currentOutfit);
  });

  // TODO: Remove this when connecting to arduino
  // async function updateCurrentlyScannedOutfit(currentOutfit: Prisma.OutfitUpdateInput) {
  //   currentOutfit = await updateCurrentlyScannedOutfitHandler(currentOutfit);
  //   console.log(currentOutfit);
  // }
  // updateCurrentlyScannedOutfit(currentOutfit);

    
