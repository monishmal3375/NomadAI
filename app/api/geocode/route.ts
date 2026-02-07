import { NextResponse } from "next/server";

export const runtime = "nodejs";

type NominatimResult = {
  lat: string;
  lon: string;
  display_name: string;
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") || "").trim();

  if (!q) {
    return NextResponse.json({ error: "Missing q" }, { status: 400 });
  }

  // USA + Canada only (you said your product scope for now)
  const url =
    "https://nominatim.openstreetmap.org/search?" +
    new URLSearchParams({
      format: "json",
      q,
      limit: "1",
      addressdetails: "0",
      countrycodes: "us,ca",
    }).toString();

  // Nominatim policy prefers identifiable User-Agent; server-side lets us set headers.
  const res = await fetch(url, {
    headers: {
      "User-Agent": "nomad-ai-demo/1.0 (Next.js server route)",
      "Accept-Language": "en",
    },
    // This is fine for demo. If you want caching later, add revalidate.
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: "Geocoding failed", status: res.status },
      { status: 502 }
    );
  }

  const data = (await res.json()) as NominatimResult[];
  if (!data.length) {
    return NextResponse.json({ error: "No results" }, { status: 404 });
  }

  const first = data[0];
  return NextResponse.json({
    lat: Number(first.lat),
    lon: Number(first.lon),
    label: first.display_name,
  });
}