require("dotenv").config({ path: ".env.local" });
const k = (process.env.OPENAI_API_KEY || "").trim();
console.log("loaded?", !!k, "len", k.length, "prefix", k.slice(0, 7));
