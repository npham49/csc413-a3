import { train } from "@zappar/imagetraining";
import { promises as fs } from "fs";
import path from "path";

async function perform() {
  let png = await fs.readFile(path.join(__dirname, "..", "assets", "CardplusCompasslogo.png"));
  let target = await train(png);
  await fs.writeFile(path.join(__dirname, "..", "assets", "CardplusCompasslogo.zpt"), target);
}

perform();