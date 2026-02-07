"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import maplibregl, { Map as MLMap, LngLatLike } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

type Props = {
  startText?: string;
  endText?: string;
};

type GeoPoint = { lon: number; lat: number; label: string };

const FALLBACKS: Record<string, GeoPoint> = {
  "Chicago, IL": { lon: -87.6298, lat: 41.8781, label: "Chicago, IL" },
  "New York, NY": { lon: -74.006, lat: 40.7128, label: "New York, NY" },
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

/**
 * Super-light geocoding (no key) via OpenStreetMap Nominatim.
 * Note: Nominatim has rate limits — for a demo UI it’s fine.
 */
async function geocode(q: string): Promise<GeoPoint | null> {
  const query = q.trim();
  if (!query) return null;

  const url =
    "https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&q=" +
    encodeURIComponent(query);

  const res = await fetch(url, {
    headers: {
      // A tiny best practice for Nominatim:
      // include a UA-ish string (they recommend identifying your app)
      "Accept-Language": "en",
    },
  });

  if (!res.ok) return null;
  const data = (await res.json()) as Array<{ lat: string; lon: string; display_name: string }>;
  if (!data?.length) return null;

  const hit = data[0];
  return {
    lat: Number(hit.lat),
    lon: Number(hit.lon),
    label: query,
  };
}

export default function MapPanel({ startText = "Chicago, IL", endText = "New York, NY" }: Props) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MLMap | null>(null);

  const [start, setStart] = useState<GeoPoint | null>(null);
  const [end, setEnd] = useState<GeoPoint | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");

  // Keep labels stable and avoid recreating effects on every keystroke noise
  const fromLabel = useMemo(() => startText.trim() || "Chicago, IL", [startText]);
  const toLabel = useMemo(() => endText.trim() || "New York, NY", [endText]);

  // 1) Create the map once
  useEffect(() => {
    if (!wrapRef.current) return;
    if (mapRef.current) return;

    const map = new maplibregl.Map({
      container: wrapRef.current,
      // Free raster tiles (no key). Works great for demos.
      style: {
        version: 8,
        sources: {
          osm: {
            type: "raster",
            tiles: [
              "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
              "https://b.tile.openstreetmap.org/{z}/{x}/{y}.png",
              "https://c.tile.openstreetmap.org/{z}/{x}/{y}.png",
            ],
            tileSize: 256,
            attribution: "© OpenStreetMap contributors",
          },
        },
        layers: [
          {
            id: "osm",
            type: "raster",
            source: "osm",
          },
        ],
      },
      center: [-96, 38] as LngLatLike,
      zoom: 3.2,
      attributionControl: false,
    });

    map.addControl(new maplibregl.NavigationControl({ visualizePitch: false }), "bottom-right");
    map.addControl(new maplibregl.AttributionControl({ compact: true }), "bottom-left");

    mapRef.current = map;

    // IMPORTANT: force resize after mount (fixes “blank map” in flex layouts)
    const t = setTimeout(() => map.resize(), 50);

    return () => {
      clearTimeout(t);
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // 2) Geocode whenever start/end text changes
  useEffect(() => {
    let alive = true;

    async function run() {
      setStatus("loading");

      // fallbacks if user types nothing / geocode fails
      const fallbackFrom = FALLBACKS[fromLabel] ?? FALLBACKS["Chicago, IL"];
      const fallbackTo = FALLBACKS[toLabel] ?? FALLBACKS["New York, NY"];

      try {
        const [a, b] = await Promise.all([geocode(fromLabel), geocode(toLabel)]);
        if (!alive) return;

        setStart(a ?? fallbackFrom);
        setEnd(b ?? fallbackTo);
        setStatus("ready");
      } catch {
        if (!alive) return;
        setStart(fallbackFrom);
        setEnd(fallbackTo);
        setStatus("error");
      }
    }

    run();
    return () => {
      alive = false;
    };
  }, [fromLabel, toLabel]);

  // 3) Render/animate markers + line when we have points
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    if (!start || !end) return;

    const routeId = "route-line";
    const routeSourceId = "route-source";
    const pointsSourceId = "points-source";

    const from: [number, number] = [start.lon, start.lat];
    const to: [number, number] = [end.lon, end.lat];

    // helper: safely add/update sources
    const upsertSource = (id: string, data: any) => {
      const src = map.getSource(id) as any;
      if (src) src.setData(data);
      else map.addSource(id, { type: "geojson", data });
    };

    // Wait until style is ready
    const onLoad = () => {
      // Fit bounds nicely
      const west = Math.min(from[0], to[0]);
      const east = Math.max(from[0], to[0]);
      const south = Math.min(from[1], to[1]);
      const north = Math.max(from[1], to[1]);

      map.fitBounds(
        [
          [west, south],
          [east, north],
        ],
        { padding: 80, duration: 900 }
      );

      // Add / update points source
      upsertSource(pointsSourceId, {
        type: "FeatureCollection",
        features: [
          { type: "Feature", properties: { kind: "start" }, geometry: { type: "Point", coordinates: from } },
          { type: "Feature", properties: { kind: "end" }, geometry: { type: "Point", coordinates: to } },
        ],
      });

      // Route source starts as just the first point (for “draw” animation)
      upsertSource(routeSourceId, {
        type: "Feature",
        properties: {},
        geometry: { type: "LineString", coordinates: [from, from] },
      });

      // Layers (only add once)
      if (!map.getLayer(routeId)) {
        map.addLayer({
          id: routeId,
          type: "line",
          source: routeSourceId,
          paint: {
            "line-color": "rgba(15,23,42,0.85)",
            "line-width": 4,
            "line-opacity": 0.85,
            "line-dasharray": [2, 2],
          },
        });
      }

      // Start marker
      if (!map.getLayer("start-dot")) {
        map.addLayer({
          id: "start-dot",
          type: "circle",
          source: pointsSourceId,
          filter: ["==", ["get", "kind"], "start"],
          paint: {
            "circle-radius": 7,
            "circle-color": "#0f172a",
            "circle-stroke-width": 3,
            "circle-stroke-color": "rgba(255,255,255,0.9)",
          },
        });
      }

      // End marker
      if (!map.getLayer("end-dot")) {
        map.addLayer({
          id: "end-dot",
          type: "circle",
          source: pointsSourceId,
          filter: ["==", ["get", "kind"], "end"],
          paint: {
            "circle-radius": 7,
            "circle-color": "#0f172a",
            "circle-stroke-width": 3,
            "circle-stroke-color": "rgba(255,255,255,0.9)",
          },
        });
      }

      // Pulsing ring on end
      if (!map.getLayer("end-pulse")) {
        map.addLayer({
          id: "end-pulse",
          type: "circle",
          source: pointsSourceId,
          filter: ["==", ["get", "kind"], "end"],
          paint: {
            "circle-radius": 16,
            "circle-color": "rgba(59,130,246,0.12)",
            "circle-stroke-width": 2,
            "circle-stroke-color": "rgba(59,130,246,0.28)",
          },
        });
      }

      // Animate the route "drawing"
      let raf = 0;
      const startTime = performance.now();
      const duration = 1100;

      const tick = (now: number) => {
        const t = clamp((now - startTime) / duration, 0, 1);
        const mid: [number, number] = [lerp(from[0], to[0], t), lerp(from[1], to[1], t)];

        const src = map.getSource(routeSourceId) as any;
        if (src) {
          src.setData({
            type: "Feature",
            properties: {},
            geometry: { type: "LineString", coordinates: [from, mid] },
          });
        }

        // pulse ring animation
        const pulse = 16 + Math.sin(now / 250) * 3;
        if (map.getLayer("end-pulse")) {
          map.setPaintProperty("end-pulse", "circle-radius", pulse);
          map.setPaintProperty("end-pulse", "circle-opacity", 0.55 - Math.abs(Math.sin(now / 350)) * 0.35);
        }

        if (t < 1) raf = requestAnimationFrame(tick);
      };

      raf = requestAnimationFrame(tick);

      return () => cancelAnimationFrame(raf);
    };

    if (map.isStyleLoaded()) {
      const cleanup = onLoad();
      // also resize again (fixes blank map when panel becomes visible)
      setTimeout(() => map.resize(), 50);
      return cleanup;
    }

    map.once("load", () => {
      const cleanup = onLoad();
      setTimeout(() => map.resize(), 50);
      // @ts-expect-error cleanup is fine
      return cleanup;
    });
  }, [start, end]);

  return (
    <section className="h-full min-h-0 rounded-3xl glass elevated premium-hover relative overflow-hidden">
      {/* Header overlay */}
      <div className="absolute left-4 top-4 z-20 rounded-2xl bg-white/70 border border-white/50 px-4 py-3">
        <div className="text-xs text-slate-500">Route</div>
        <div className="mt-0.5 text-sm font-semibold text-slate-900">
          {fromLabel} <span className="text-slate-400">→</span> {toLabel}
        </div>
        <div className="mt-1 text-xs text-slate-500">
          {status === "loading" ? "Locating places…" : "Accurate markers + animated route"}
        </div>
      </div>

      {/* Map container */}
      <div className="absolute inset-0">
        <div ref={wrapRef} className="h-full w-full" />
      </div>

      {/* Fallback shimmer while loading */}
      {status === "loading" && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_18%,rgba(59,130,246,0.10),transparent_55%),radial-gradient(circle_at_82%_85%,rgba(148,163,184,0.18),transparent_60%)]" />
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0 shimmer" />
          </div>
        </div>
      )}
    </section>
  );
}