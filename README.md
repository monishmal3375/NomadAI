# NomadAI ✈️🤖  
AI-powered travel itinerary planner with a premium UI (map + chat + day planner + trip summary).

NomadAI lets a user type a natural language trip request like:

> “I want to go from Chicago to New York for 4 days with 4 people and a $3000 budget.”

…and the app extracts intent, builds UI panels, and generates itinerary content using AI.

---

## Features

✅ Google Sign-In (NextAuth)  
✅ AI Intent Extraction (from/to/days/people/budget/preferences)  
✅ 4-column layout:
- Map panel (route display)
- AI chat column
- Day planner column
- Stats rail (summary, daily target, currency, weather)  
✅ UI-focused demo experience (fast + clean)

---

## Tech Stack

- **Next.js 16 (App Router)**
- **React 19**
- **TypeScript**
- **TailwindCSS**
- **NextAuth (Google OAuth)**
- **OpenAI API** (intent extraction + itinerary generation)
- **Jest + Testing Library** (unit tests)

---

## Requirements

Make sure you have these installed:

- **Node.js 18+**
- **npm** (or pnpm/yarn)
- A **Google Cloud OAuth Client**
- An **OpenAI API Key**

---

## Environment Variables

Create a file called:

✅ `.env.local`

Example:

```bash
# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_long_random_secret_here

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# OpenAI API Key
OPENAI_API_KEY=your_openai_api_key_here


🔥 External AI Token Usage (OpenAI)

NomadAI uses the OpenAI API for:
	•	Extracting trip intent (from/to, days, people, budget, preferences)
	•	Generating the day-by-day itinerary dictionary
	•	Answering chat questions using the current trip context

What “tokens” mean

OpenAI charges based on tokens, which are pieces of text (both input + output).
	•	Input tokens = the prompt you send (user request + context)
	•	Output tokens = the model’s response

Even short requests can use more tokens if the app includes a lot of context (example: weather data + itinerary dictionary + trip summary).

What increases token usage

Token usage goes up when:
	•	The user types long prompts
	•	You include full itinerary + weather data inside the chat context
	•	You request large multi-day plans (ex: 7+ days)
	•	You generate long responses (ex: full schedules + hotel/food details)

Estimated usage (example)

These are rough UI demo estimates (varies by model + response length):
	•	Intent extraction request: low (small JSON)
	•	Day planner generation: medium to high (multi-day structured output)
	•	Chat requests: depends on how much context is provided

Cost control / limits (recommended)

To prevent token waste, the app should:
	•	Use short structured JSON outputs when possible
	•	Avoid sending full weather data to chat if not needed
	•	Only include the relevant day data (instead of the whole itinerary)
	•	Set a reasonable max_tokens for responses
	•	Cache results so repeated actions do not trigger extra API calls

⚠️ Important: A valid OpenAI API key is required to use AI features, and usage may result in charges depending on your OpenAI billing plan.

✅ Testing

This repo includes unit tests for login and auth-related components.

What is tested
	•	Frontend login component renders properly
	•	NextAuth config/options module loads correctly (backend config validation)

Prevent accidental API spending
NomadAI is currently a demo UI. If you enable real OpenAI calls, it is recommended to add:
	•	rate limiting per user
	•	request debouncing (prevent spam clicks)
	•	usage logging (tokens per request)
