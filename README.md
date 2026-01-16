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
