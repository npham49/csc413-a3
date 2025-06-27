import {OpenAI} from "openai";
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
import promptContent from "./promptContent.json";

export async function generateStories() {
    let templateOutfit: string = "- Outfit %s: %colorUpper %upper and %colorLower %lower\n";
    templateOutfit = templateOutfit.replace("%s", "1");
    templateOutfit = templateOutfit.replace("%colorUpper", "red");
    templateOutfit = templateOutfit.replace("%upper", "TSHIRT");
    templateOutfit = templateOutfit.replace("%colorLower", "blue");
    templateOutfit = templateOutfit.replace("%lower", "PANTS");
    console.log(templateOutfit);
    promptContent.input += templateOutfit;
    const response = await client.responses.create(promptContent);
    return response.output_text;
}


