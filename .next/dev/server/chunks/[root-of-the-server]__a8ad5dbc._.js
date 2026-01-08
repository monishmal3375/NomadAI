module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[project]/Documents/GitHub/NomadAI/lib/secret.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getOpenAIKey",
    ()=>getOpenAIKey
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
;
;
function getOpenAIKey() {
    const p = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), "api.json");
    if (!__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(p)) {
        throw new Error(`api.json not found at project root. Create it with { "OPENAI_API_KEY": "..." }`);
    }
    const raw = __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readFileSync(p, "utf8");
    const json = JSON.parse(raw);
    const key = json.OPENAI_API_KEY?.trim();
    if (!key) throw new Error("OPENAI_API_KEY missing in api.json");
    return key;
}
}),
"[project]/Documents/GitHub/NomadAI/app/api/intent/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST,
    "runtime",
    ()=>runtime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$NomadAI$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/NomadAI/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$NomadAI$2f$node_modules$2f$openai$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/GitHub/NomadAI/node_modules/openai/index.mjs [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$NomadAI$2f$node_modules$2f$openai$2f$client$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__OpenAI__as__default$3e$__ = __turbopack_context__.i("[project]/Documents/GitHub/NomadAI/node_modules/openai/client.mjs [app-route] (ecmascript) <export OpenAI as default>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$NomadAI$2f$lib$2f$secret$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/NomadAI/lib/secret.ts [app-route] (ecmascript)");
;
;
;
const runtime = "nodejs"; // important (fs + node runtime)
async function POST(req) {
    try {
        const { prompt } = await req.json();
        if (!prompt?.trim()) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$NomadAI$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Missing prompt"
            }, {
                status: 400
            });
        }
        const client = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$NomadAI$2f$node_modules$2f$openai$2f$client$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__OpenAI__as__default$3e$__["default"]({
            apiKey: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$NomadAI$2f$lib$2f$secret$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getOpenAIKey"])()
        });
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
                {
                    role: "system",
                    content: system
                },
                {
                    role: "user",
                    content: prompt
                }
            ]
        });
        console.log("Raw model response:", resp);
        const text = resp.choices[0]?.message?.content?.trim() ?? "";
        console.log("Model output:", text);
        // Parse JSON safely
        let intent;
        try {
            const parsed = JSON.parse(text);
            intent = {
                from: parsed.from ?? undefined,
                to: parsed.to ?? undefined,
                days: typeof parsed.days === "number" ? parsed.days : undefined,
                people: typeof parsed.people === "number" ? parsed.people : undefined,
                budget: typeof parsed.budget === "number" ? parsed.budget : undefined,
                prefs: Array.isArray(parsed.prefs) ? parsed.prefs : undefined
            };
        } catch  {
            // If the model ever returns non-JSON, fail gracefully
            return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$NomadAI$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Model returned invalid JSON",
                raw: text
            }, {
                status: 502
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$NomadAI$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            intent
        });
    } catch (e) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$NomadAI$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: e?.message ?? "Unknown error"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__a8ad5dbc._.js.map