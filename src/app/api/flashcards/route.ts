import "dotenv/config";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";

export const FlashcardSchema = z.object({
  id: z.string(),
  term: z.string(),
  definition: z.string(),
});
export const DeckSchema = z.object({
  id: z.string(),
  name: z.string(),
  cards: z.array(FlashcardSchema),
});
export type IDeckAPISchema = z.infer<typeof DeckSchema>;
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });


export async function POST(req: Request) {
  try{
    const {description} = await req.json()
    const completion = await openai.beta.chat.completions.parse({
      model: "gpt-4o-mini",
      response_format: zodResponseFormat(DeckSchema, "deck"),
      messages: [
        {
          role: "system",
          content: `You are an AI that generates structured flashcard decks in portuguese.`,
        },
        {
          role: "user",
          content: `Generate a portuguese flashcard deck on ${description} with 50 cards`,
        },
      ],
    });
    const deck = completion.choices[0]?.message.parsed;
    if(!deck){
      throw new Error("Failed to generate a valid deck")
    }

    return NextResponse.json(deck);
  } catch (error) {
    console.error("Error generating flashcard deck:", error);
  }
}
