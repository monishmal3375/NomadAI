# NomadAI ✈️🤖

AI-powered travel itinerary planner with a premium UI featuring an interactive map, AI chat interface, day-by-day planner, and trip statistics.

## Overview

NomadAI allows users to plan trips using natural language. Simply type a request like:

> "I want to go from Chicago to New York for 4 days with 4 people and a $3000 budget."

The application uses AI to extract trip details, generate a personalized itinerary, and present it in an intuitive 4-column layout.

---

## Features

✅ **Google Sign-In** - Secure authentication via NextAuth  
✅ **AI Intent Extraction** - Automatically parses trip details (origin, destination, days, travelers, budget, preferences)  
✅ **4-Column Layout**:
- Interactive map panel with route visualization
- AI chat interface for trip questions
- Day-by-day planner with activities
- Statistics panel (budget summary, daily targets, currency, weather)  
✅ **Real-time Itinerary Generation** - Powered by OpenAI API  
✅ **Unit Testing Suite** - Frontend and backend login tests included

---

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI Library:** React 19
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **Authentication:** NextAuth (Google OAuth)
- **AI Provider:** OpenAI API
- **Testing:** Jest + React Testing Library

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** version 20.9 or higher ([download here](https://nodejs.org/))
- **npm** (comes with Node.js)
- **Git** ([download here](https://git-scm.com/))

You will also need:

- A **Google Cloud OAuth Client** ([setup guide](https://console.cloud.google.com/apis/credentials))
- An **OpenAI API Key** ([get one here](https://platform.openai.com/api-keys))

---

## Step-by-Step Setup and Run Guide

### 1. Clone the Repository

```bash
git clone https://github.com/monishmal3375/NomadAI.git
cd NomadAI
```

### 2. Install Dependencies

**This project uses npm** as the package manager.

```bash
npm install
```

**Expected output:**
```
added 342 packages in 45s
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```bash
touch .env.local
```

Add the following variables (replace with your actual credentials):

```bash
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_long_random_secret_here_at_least_32_characters

# Google OAuth Credentials
GOOGLE_CLIENT_ID=your_google_client_id_here.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# OpenAI API Key
OPENAI_API_KEY=sk-your_openai_api_key_here
```

**How to generate `NEXTAUTH_SECRET`:**
```bash
openssl rand -base64 32
```

**⚠️ Security Note:** Never commit `.env.local` to version control. It's already in `.gitignore`.

### 4. Run the Development Server

```bash
npm run dev
```

**Expected output:**
```
  ▲ Next.js 16.1.1
  - Local:        http://localhost:3000
  - Ready in 2.3s
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### 5. Build for Production

```bash
npm run build
```

**Expected output:**
```
  ▲ Next.js 16.1.1

  Creating an optimized production build ...
  ✓ Compiled successfully
  ✓ Linting and checking validity of types
  ✓ Collecting page data
  ✓ Generating static pages (7/7)
  ✓ Finalizing page optimization

Route (app)                              Size     First Load JS
┌ ○ /                                    5.2 kB         95.1 kB
└ ○ /api/auth/[...nextauth]              0 B             0 B
```

### 6. Start Production Server

```bash
npm start
```

---

## Environment Dependencies

### Required Environment Variables

| Variable | Purpose | Example | Required |
|----------|---------|---------|----------|
| `NEXTAUTH_URL` | Base URL for NextAuth callbacks | `http://localhost:3000` | ✅ Yes |
| `NEXTAUTH_SECRET` | Encryption secret (32+ chars) | `generated_via_openssl` | ✅ Yes |
| `GOOGLE_CLIENT_ID` | Google OAuth Client ID | `123...apps.googleusercontent.com` | ✅ Yes |
| `GOOGLE_CLIENT_SECRET` | Google OAuth Secret | `GOCSPX-...` | ✅ Yes |
| `OPENAI_API_KEY` | OpenAI API authentication | `sk-proj-...` | ✅ Yes |

### Troubleshooting Missing Environment Variables

**Missing OpenAI API Key:**

If `OPENAI_API_KEY` is missing or invalid, the following API routes will fail:
- `/api/intent` - Trip intent extraction
- `/api/itinerary` - Day-by-day itinerary generation  
- `/api/chat` - AI chat responses

**What you'll see:**
- API errors in the browser console (F12 → Console tab) when attempting to use these features
- Server-side errors in the terminal where `npm run dev` is running
- Features that depend on OpenAI will not work

**How to fix:**
1. Verify `.env.local` exists in the project root
2. Ensure it contains: `OPENAI_API_KEY=sk-proj-your_actual_key_here`
3. Restart the development server after adding the key

**Missing Google OAuth Credentials:**

If `GOOGLE_CLIENT_ID` or `GOOGLE_CLIENT_SECRET` is missing or empty, Google sign-in will fail. This is a configuration issue, not a broken sign-in button.

**Common errors you'll see:**
- `client_id is required` - The `GOOGLE_CLIENT_ID` is missing or empty
- `invalid_client` - Credentials are incorrect or not properly configured
- `[next-auth][error][OAUTH_CALLBACK_ERROR]` - General OAuth configuration error

**Where to find the error:** 
- Browser console (F12 → Console tab) when clicking the sign-in button
- Terminal (server-side errors)

**How to fix:**
1. Verify `.env.local` exists and contains both:
```
   GOOGLE_CLIENT_ID=your_id.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=GOCSPX-your_secret
```
2. Ensure the authorized redirect URI is set in [Google Cloud Console](https://console.cloud.google.com/):
```
   http://localhost:3000/api/auth/callback/google
```
3. Restart the development server after adding credentials

**General Log File Locations:**
- **Development:** All logs appear in the terminal where you ran `npm run dev`
- **Production:** Logs go to stdout/stderr from `npm start`
- **Browser errors:** Open DevTools (F12) → Console tab

---

## OpenAI Token Usage & Costs

### What Are Tokens?

NomadAI uses the OpenAI API, which charges based on **tokens**. Tokens are pieces of text that the AI processes:

- **Input tokens:** Your prompt + context sent to the API
- **Output tokens:** The AI's response

Approximately **4 characters = 1 token** on average.

### How NomadAI Uses the API

The app makes OpenAI API calls for:

1. **Trip Intent Extraction** - Parses user requests to extract destination, dates, budget, etc.
2. **Itinerary Generation** - Creates day-by-day plans with activities, restaurants, and attractions
3. **Chat Responses** - Answers user questions about the trip using trip context

### Estimated Token Usage

These are rough estimates (actual usage varies by request complexity):

| Action | Input Tokens | Output Tokens | Approx. Cost* |
|--------|-------------|---------------|---------------|
| Intent extraction (short query) | 100-200 | 50-100 | $0.001-0.002 |
| 4-day itinerary generation | 500-1000 | 1500-3000 | $0.01-0.02 |
| Chat question with context | 300-800 | 200-500 | $0.003-0.008 |

*Based on GPT-4 pricing (~$0.03/1K input tokens, ~$0.06/1K output tokens). Check [OpenAI pricing](https://openai.com/pricing) for current rates.

### What Increases Token Usage

Token consumption grows when:

- Users request multi-day trips (7+ days)
- Full itinerary context is included in chat requests
- Weather data and trip stats are sent to the AI
- Users ask for detailed recommendations (restaurants, hotels, activities)

### Cost Control Recommendations

To minimize API costs:

1. **Set `max_tokens` limits** in API calls (prevents runaway responses)
2. **Cache results** - Don't regenerate the same itinerary multiple times
3. **Limit context** - Only send relevant trip data to chat, not the entire itinerary
4. **Use shorter prompts** - Be concise in system messages
5. **Add rate limiting** - Prevent rapid repeated requests
6. **Monitor usage** - Check your OpenAI dashboard regularly

⚠️ **Important:** You are responsible for OpenAI API charges. Set up billing limits in your [OpenAI account](https://platform.openai.com/account/billing/limits).

---

## Testing

### Overview

NomadAI includes a unit testing suite using **Jest** and **React Testing Library**. Tests cover both frontend components and backend authentication configuration.

### Test Coverage

**Frontend Tests** (`__tests__/LoginForm.test.tsx`):
- ✅ Login button renders correctly
- ✅ Google sign-in is triggered on click
- ✅ Correct callback URL is passed to NextAuth

**Backend Tests** (`__tests__/auth-options.test.ts`):
- ✅ NextAuth has at least one provider configured
- ✅ Session strategy is set to JWT
- ✅ Google provider is properly configured

### How to Run Tests

**Run all tests once:**
```bash
npm test
```

**Expected output:**
```
PASS  __tests__/LoginForm.test.tsx
  LoginForm
    ✓ renders the Google sign-in button (45 ms)
    ✓ calls signIn('google') when clicked (28 ms)

PASS  __tests__/auth-options.test.ts
  NextAuth config
    ✓ has at least one provider (3 ms)
    ✓ uses jwt session strategy (1 ms)
    ✓ google provider is present (1 ms)

Test Suites: 2 passed, 2 total
Tests:       5 passed, 5 total
Snapshots:   0 total
Time:        2.847 s
```

**Run tests in watch mode** (re-runs automatically when files change):
```bash
npm run test:watch
```

**Run tests with coverage report:**
```bash
npm test -- --coverage
```

This will show you which lines of code are covered by tests.

### Test Configuration

- **Jest config:** `jest.config.js`
- **Setup file:** `jest.setup.ts` (imports `@testing-library/jest-dom`)
- **Test environment:** jsdom (simulates browser)
- **Module aliases:** `@/` maps to project root

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server at http://localhost:3000 |
| `npm run build` | Create optimized production build |
| `npm start` | Run production server (requires `npm run build` first) |
| `npm test` | Run all unit tests once |
| `npm run test:watch` | Run tests in watch mode (re-runs on file changes) |
| `npm run lint` | Run ESLint to check code quality |

---

## Project Structure

```
NomadAI/
├── app/                    # Next.js app router pages
├── components/             # React components
│   └── LoginForm.tsx       # Google sign-in component
├── lib/                    # Utility functions
│   └── auth/
│       └── options.ts      # NextAuth configuration
├── public/                 # Static assets
├── __tests__/              # Unit tests
│   ├── LoginForm.test.tsx  # Frontend login tests
│   └── auth-options.test.ts # Backend auth tests
├── .env.local              # Environment variables (not committed)
├── .gitignore              # Git ignore rules
├── jest.config.js          # Jest configuration
├── jest.setup.ts           # Jest setup file
├── next.config.ts          # Next.js configuration
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
└── README.md               # This file
```

---

## Troubleshooting Common Issues

**1. "OpenAI API key not configured" error**

Check that your `.env.local` file exists and contains:
```bash
OPENAI_API_KEY=sk-proj-your_actual_key_here
```

Restart the dev server after adding the key:
```bash
# Stop the server with Ctrl+C, then:
npm run dev
```

**2. "NextAuth callback error"**

Verify your Google OAuth credentials in `.env.local`:
```bash
GOOGLE_CLIENT_ID=your_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-your_secret
```

Also ensure the callback URL is authorized in [Google Cloud Console](https://console.cloud.google.com/):
```
http://localhost:3000/api/auth/callback/google
```

**3. Tests failing with module errors**

Clear Jest cache and reinstall:
```bash
npm test -- --clearCache
rm -rf node_modules
npm install
```

**4. Port 3000 already in use**

Kill the process using port 3000:
```bash
# macOS/Linux
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

Or use a different port:
```bash
PORT=3001 npm run dev
```

---

## Future Improvements

The following features are planned for future development:

- [ ] **Multi-destination trips** - Support for complex itineraries with multiple cities
- [ ] **Real-time collaboration** - Share and edit trips with travel companions
- [ ] **Expense tracking** - Monitor spending against budget during the trip
- [ ] **Offline mode** - Download itineraries for offline access
- [ ] **Mobile app** - Native iOS/Android applications
- [ ] **Alternative AI providers** - Support for Claude, Gemini, etc.
- [ ] **Social features** - Share trips publicly, save others' itineraries
- [ ] **Hotel/flight booking integration** - Direct booking through the app
- [ ] **Advanced filtering** - Filter activities by type, price, accessibility
- [ ] **Multi-language support** - Interface and itineraries in multiple languages
- [ ] **PDF export** - Download trip itinerary as a formatted PDF
- [ ] **Calendar integration** - Sync trip to Google Calendar/Apple Calendar
- [ ] **Trip history** - Save and revisit previous trip plans

