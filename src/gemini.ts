import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error("No API Key");
}

const genAi = new GoogleGenerativeAI(API_KEY);

const model = genAi.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: `give me the errors in the code along with line number and resoures as json with line,error_type,fix,online resource to learn about as key online_resource,explanation,corrected_code as a single object`,
});

async function getAiResponse(
  prompt: string,
  imgBuffer: Buffer,
  mimeType: string,
) {
  const result = await model.generateContent([
    prompt,
    {
      inlineData: { data: Buffer.from(imgBuffer).toString("base64"), mimeType },
    },
  ]);
  const text = result.response.text();
  return text;
}

export async function getImgInfo(imgBuffer: Buffer, mimeType: string) {
  const result = await getAiResponse("give me the error?", imgBuffer, mimeType);
  // console.log(result.slice(7, -3));
  // console.log(result);
  // console.log(JSON.parse(result.slice(7, -3)));
  return JSON.parse(result.slice(7, -3));
}
