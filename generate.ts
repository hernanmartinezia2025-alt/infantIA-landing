import { GoogleGenAI } from "@google/genai";
import fs from 'fs';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function generate() {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: 'A cartoon style illustration of a mother and her young child playing together with colorful building blocks and toy cars on the floor. The mother has brown hair and is wearing a pink shirt. The child has curly dark hair and is wearing a red shirt. Bright, cheerful colors, clean vector art style, white background.'
          }
        ]
      }
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        const base64Data = part.inlineData.data;
        fs.writeFileSync('public/mother-child-illustration.png', Buffer.from(base64Data, 'base64'));
        console.log('Image saved successfully!');
      }
    }
  } catch (e) {
    console.error('Error generating image:', e);
  }
}

generate();
