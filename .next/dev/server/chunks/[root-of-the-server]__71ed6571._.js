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
"[project]/Documents/GitHub/NomadAI/app/api/chat/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST,
    "runtime",
    ()=>runtime
]);
// app/api/chat/route.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$NomadAI$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/NomadAI/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$NomadAI$2f$node_modules$2f$openai$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/GitHub/NomadAI/node_modules/openai/index.mjs [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$NomadAI$2f$node_modules$2f$openai$2f$client$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__OpenAI__as__default$3e$__ = __turbopack_context__.i("[project]/Documents/GitHub/NomadAI/node_modules/openai/client.mjs [app-route] (ecmascript) <export OpenAI as default>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$NomadAI$2f$lib$2f$secret$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/NomadAI/lib/secret.ts [app-route] (ecmascript)");
;
;
;
const runtime = "nodejs";
const client = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$NomadAI$2f$node_modules$2f$openai$2f$client$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__OpenAI__as__default$3e$__["default"]({
    apiKey: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$NomadAI$2f$lib$2f$secret$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getOpenAIKey"])()
});
async function POST(req) {
    try {
        const body = await req.json();
        const userMessage = (body.message ?? "").trim();
        if (!userMessage) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$NomadAI$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Missing message"
            }, {
                status: 400
            });
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
            model: "gpt-4o-mini",
            temperature: 0.4,
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
        const text = completion.choices[0]?.message?.content?.trim() ?? "";
        // Try parse strict JSON
        let parsed = null;
        try {
            parsed = JSON.parse(text);
        } catch  {
            // fallback: return raw reply if model didn't comply
            return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$NomadAI$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                reply: text
            }, {
                status: 200
            });
        }
        // sanitize
        const reply = typeof parsed.reply === "string" ? parsed.reply : text;
        const itineraryPatch = parsed.itineraryPatch && typeof parsed.itineraryPatch === "object" ? parsed.itineraryPatch : undefined;
        return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$NomadAI$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            reply,
            itineraryPatch
        }, {
            status: 200
        });
    } catch (e) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$NomadAI$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: e?.message ?? "Server error"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__71ed6571._.js.map