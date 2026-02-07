import { NextResponse } from "next/server";
import OpenAI from "openai";
import { getOpenAIKey } from "@/lib/secret";

export const runtime = "nodejs"; // important (fs + node runtime)

type Intent = {
  from?: string;
  to?: string;
  days?: number;
  people?: number;
  budget?: number;
  prefs?: string[];
};

export async function POST(req: Request) {
  try {
    const { prompt } = (await req.json()) as { prompt?: string };
    if (!prompt?.trim()) {
      return NextResponse.json({ error: "Missing prompt" }, { status: 400 });
    }

    const client = new OpenAI({ apiKey: getOpenAIKey() });

    // We force JSON-only output so it's easy to parse
    const system = `
You extract structured trip intent from a user's natural language request.
Return ONLY valid JSON (no markdown, no extra text).

Schema:
{
  "from": string | null,
  "to": string | null,
  "days": number | null,
  "people": number | null,
  "budget": number | null,
  "prefs": string[] | null
}
important:
- from and to are location names (city, region, etc.) they should be expected correctly, even if the user misspels them correct it.
- from and to should not have any prefix or suffix added in the output, there should strictly be the location name only.

Rules:
- "from" and "to" should be city/region names if available.
- days/people/budget should be numbers if explicitly stated.
- prefs: short tags like "museums", "food", "nightlife", "family friendly", "outdoors".
- If missing, use null.
`;

    const resp = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      temperature: 0.2,
      messages: [
        { role: "system", content: system },
        { role: "user", content: prompt }
      ],
    });
console.log("Raw model response:", resp);
    const text = resp.choices[0]?.message?.content?.trim() ?? "";
console.log("Model output:", text);
    // Parse JSON safely
    let intent: Intent;
    try {
      const parsed = JSON.parse(text);
      intent = {
        from: parsed.from ?? undefined,
        to: parsed.to ?? undefined,
        days: typeof parsed.days === "number" ? parsed.days : undefined,
        people: typeof parsed.people === "number" ? parsed.people : undefined,
        budget: typeof parsed.budget === "number" ? parsed.budget : undefined,
        prefs: Array.isArray(parsed.prefs) ? parsed.prefs : undefined,
      };
    } catch {
      // If the model ever returns non-JSON, fail gracefully
      return NextResponse.json(
        { error: "Model returned invalid JSON", raw: text },
        { status: 502 }
      );
    }

    return NextResponse.json({ intent });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}