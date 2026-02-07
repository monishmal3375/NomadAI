// app/api/chat/route.ts
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { getOpenAIKey } from "@/lib/secret";

export const runtime = "nodejs";


const client = new OpenAI({ apiKey: getOpenAIKey() });


type ChatReq = {
  message: string;
  context: {
    intent?: any;
    weather?: any;
    itinerary?: any;
  };
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ChatReq;

    const userMessage = (body.message ?? "").trim();
    if (!userMessage) {
      return NextResponse.json({ error: "Missing message" }, { status: 400 });
    }

    const intent = body.context?.intent ?? {};
    const weather = body.context?.weather ?? {};
    const itinerary = body.context?.itinerary ?? {};

    const system = `
You are NomadAI's trip assistant.

You MUST respond in STRICT JSON with this shape:
{
  "reply": string,
  "itineraryPatch"?: object
}

Rules:
- Always answer the user's question using ONLY the provided trip context.
- If the user asks to change the plan (add/remove/move activities, change time blocks, etc),
  make the modifications only in the specified part of the itinerary, keep rest the same and return it as itineraryPatch, dont just return the modified part.
- If no itinerary change is needed, omit itineraryPatch entirely.
- Do NOT include markdown. Do NOT include extra keys.
-
`;

    const prompt = `
TRIP CONTEXT (read-only):
INTENT: ${JSON.stringify(intent)}
WEATHER: ${JSON.stringify(weather)}
ITINERARY: ${JSON.stringify(itinerary)}

USER MESSAGE:
${userMessage}
`;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini", // fast/cheap for chat
      temperature: 0.4,
      messages: [
        { role: "system", content: system },
        { role: "user", content: prompt },
      ],
    });

    const text = completion.choices[0]?.message?.content?.trim() ?? "";

    // Try parse strict JSON
    let parsed: any = null;
    try {
      parsed = JSON.parse(text);
    } catch {
      // fallback: return raw reply if model didn't comply
      return NextResponse.json({ reply: text }, { status: 200 });
    }

    // sanitize
    const reply = typeof parsed.reply === "string" ? parsed.reply : text;
    const itineraryPatch =
      parsed.itineraryPatch && typeof parsed.itineraryPatch === "object"
        ? parsed.itineraryPatch
        : undefined;

    return NextResponse.json({ reply, itineraryPatch }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message ?? "Server error" },
      { status: 500 }
    );
  }
}