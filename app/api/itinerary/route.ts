import { NextResponse } from "next/server";
import OpenAI from "openai";
import { getOpenAIKey } from "@/lib/secret";


const client = new OpenAI({ apiKey: getOpenAIKey() });

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { intent, weatherByDay } = body as {
      intent: any;
      weatherByDay?: any;
    };

    // If user didn't give days, we still generate 1 day
    const days = typeof intent?.days === "number" && intent.days > 0 ? intent.days : 1;

    const system = `
You are a trip-planning assistant.
Return ONLY valid JSON (no markdown, no commentary).
`;

    const user = `
Generate an itinerary dictionary for a trip.

Rules:
- Output MUST be a JSON object with day keys: "1"..."${days}".
- Each day value MUST be an array of items.
- Each item MUST have: time, period, activity, location, detail.
- time should be 24h "HH:MM".
- period must be one of: morning, afternoon, evening, night.
- Use destination city from intent.to. If unknown, still produce a generic itinerary.
- Use intent.prefs if present.
- If weatherByDay is provided, incorporate it (suggest indoor options if cold/rain).
- Keep it realistic: 4-7 items per day.

INPUT INTENT:
${JSON.stringify(intent, null, 2)}

WEATHER (optional):
${JSON.stringify(weatherByDay ?? null, null, 2)}

Return JSON now.
`;
console.log("Itinerary system prompt:", user);
    const resp = await client.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.4,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: system.trim() },
        { role: "user", content: user.trim() },
      ],
    });

    const text = resp.choices[0]?.message?.content ?? "{}";
    const itinerary = JSON.parse(text);

    return NextResponse.json({ itinerary });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message ?? "Failed to generate itinerary" },
      { status: 500 }
    );
  }
}