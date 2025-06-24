    // src/index.ts
    import express, { Request, Response } from 'express';
    import { SerialPort } from "serialport"; // ✅ Fixed
    import { ReadlineParser } from "@serialport/parser-readline";
    import cors from "cors"
    import { Prisma, LowerTypes, PrismaClient, UpperTypes } from "@prisma/client";

    import { updateCurrentlyScannedOutfitHandler } from "./handler/output.handler";

    const app = express();
    const PORT = process.env.PORT || 3000;
    let currentOutfit: Prisma.OutfitUpdateInput = {
      currentlyScanned: true,
      upper: null,
      lower: null,

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

  // Replace with your correct serial port path
  const arduinoPort = new SerialPort({ path: "/dev/cu.usbmodem11201", baudRate: 9600 }); // ✅ Fixed
  const parser = arduinoPort.pipe(new ReadlineParser({ delimiter: "\n" }));

  parser.on("data", async (line: string) => {
    console.log(">>", line.trim());
    clients.forEach((res) => res.write(`data: ${line.trim()}\n\n`));
    let currentScanned: string = line.trim();
    if (currentScanned.includes("Bottom")) {
      console.log("Bottom");
      currentOutfit.lower = currentScanned.split(" ")[1].toUpperCase() === "PANTS" ? LowerTypes.PANTS : LowerTypes.BLOUSE;
    } else if (currentScanned.includes("Top")) {
      console.log("Top");
      currentOutfit.upper = currentScanned.split(" ")[1].toUpperCase() === "SHIRT" ? UpperTypes.SHIRT : UpperTypes.TSHIRT;
    }
    console.log(currentOutfit);
    if (currentOutfit.upper || currentOutfit.lower) {
      currentOutfit =await updateCurrentlyScannedOutfitHandler(currentOutfit);
    }
    console.log(currentOutfit);
  });

    
