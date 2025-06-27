    // src/index.ts
    import express, { Request, Response } from 'express';
    import { SerialPort } from "serialport"; // ✅ Fixed
    import { ReadlineParser } from "@serialport/parser-readline";
    import cors from "cors"
    import { Prisma, LowerTypes, PrismaClient, UpperTypes } from "@prisma/client";

    import { updateCurrentlyScannedOutfitHandler, get10RecentlyScannedOutfitsHandler } from "./handler/output.handler";

    const app = express();
    const PORT = process.env.PORT || 3000;
    let currentOutfit: Prisma.OutfitUpdateInput = {
      upper: "TSHIRT", // TODO: Set to null when connecting to arduino
      lower: "BLOUSE", // TODO: Set to null when connecting to arduino
    }

    app.use(cors());

    let clients: Response[] = [];
    app.get('/', (req: Request, res: Response) => {
      res.send('Hello from Express with TypeScript!');
    });

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  // app.get("/events", (req, res) => {
  //   res.setHeader("Content-Type", "text/event-stream");
  //   res.setHeader("Cache-Control", "no-cache");
  //   res.setHeader("Connection", "keep-alive");
  //   res.flushHeaders();

  //   clients.push(res);
  //   req.on("close", () => {
  //     clients = clients.filter((c) => c !== res);
  //   });
  // });

  app.get("/stories", async (_: Request, res: Response) => {
    const outfits = await get10RecentlyScannedOutfitsHandler();
    res.json(outfits);
    console.log("outfits", outfits);
  });

  // TODO: Add back when connecting to arduino
  // Replace with your correct serial port path
  // const arduinoPort = new SerialPort({ path: "/dev/cu.usbmodem11201", baudRate: 9600 }); // ✅ Fixed
  // const parser = arduinoPort.pipe(new ReadlineParser({ delimiter: "\n" }));

  // parser.on("data", async (line: string) => {
  //   console.log(">>", line.trim());
  //   clients.forEach((res) => res.write(`data: ${line.trim()}\n\n`));
  //   let currentScanned: string = line.trim();
  //   if (currentScanned.includes("Bottom")) {
  //     console.log("Bottom");
  //     currentOutfit.lower = currentScanned.split(" ")[1].toUpperCase() === "PANTS" ? LowerTypes.PANTS : LowerTypes.BLOUSE;
  //   } else if (currentScanned.includes("Top")) {
  //     console.log("Top");
  //     currentOutfit.upper = currentScanned.split(" ")[1].toUpperCase() === "SHIRT" ? UpperTypes.SHIRT : UpperTypes.TSHIRT;
  //   }
  //   if (currentScanned.includes("Done")) {
  //     currentOutfit = {
  //       upper: null,
  //       lower: null,
  //     };
  //   }
  //   console.log(currentOutfit);
  //   if (currentOutfit.upper || currentOutfit.lower) {
  //     currentOutfit =await updateCurrentlyScannedOutfitHandler(currentOutfit);
  //   }
  //   console.log(currentOutfit);
  // });

  // TODO: Remove this when connecting to arduino
  async function updateCurrentlyScannedOutfit(currentOutfit: Prisma.OutfitUpdateInput) {
    currentOutfit = await updateCurrentlyScannedOutfitHandler(currentOutfit);
    console.log(currentOutfit);
  }

  updateCurrentlyScannedOutfit(currentOutfit);

    
