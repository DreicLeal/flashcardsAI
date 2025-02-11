import { NextResponse } from "next/server";

export default async function POST(req: Request) {
  const { messages } = await req.json();

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${process.env.OPEN_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: messages.map((msg: any) => ({
          role: msg.role,
          content: msg.content,
        })),
      }),
    });
    const data = await response.json();
    return NextResponse.json({ reply: data.choices[0].message.content });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ reply: "Error: Unable to fetch response." });
  }
}
