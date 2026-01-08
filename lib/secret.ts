import fs from "fs";
import path from "path";

type ApiJson = { OPENAI_API_KEY?: string };

export function getOpenAIKey(): string {
  const p = path.join(process.cwd(), "api.json");
  if (!fs.existsSync(p)) {
    throw new Error(
      `api.json not found at project root. Create it with { "OPENAI_API_KEY": "..." }`
    );
  }

  const raw = fs.readFileSync(p, "utf8");
  const json = JSON.parse(raw) as ApiJson;

  const key = json.OPENAI_API_KEY?.trim();
  if (!key) throw new Error("OPENAI_API_KEY missing in api.json");

  return key;
}