import {OpenAI} from "openai";
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
import promptContent from "./promptContent.json";

type Outfit = {
    colorUpper: string;
    upper: string;
    colorLower: string;
    lower: string;
}

export async function generateStories(outfits: Outfit[]) {
    let templateOutfit: string = "";
    for (let i = 0; i < outfits.length; i++) {
        const outfit = outfits[i];
        templateOutfit += `- Outfit ${i+1}: ${outfit.colorUpper} ${outfit.upper} and ${outfit.colorLower} ${outfit.lower}\n`;
    }
    console.log(templateOutfit);
    promptContent.input[1].content += templateOutfit;
    const prompt = promptContent.input.map((item: { content: string }) => item.content).join("\n");
    const response = await client.responses.create({
      ...promptContent,
      input: prompt
    });
    return response.output_text;
}

