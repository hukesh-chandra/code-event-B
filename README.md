# CU Cursed Mission Board

The combined app brings together the mission discovery experience and the progression engine.

## Run locally

1. Install dependencies with `npm install`.
2. Set `GEMINI_API_KEY` in `.env.local` if using Gemini powered features.
3. Start the app with `npm run dev`.

## Main sections

- `/` — mission board landing page
- `/board` and `/map` — browse missions and campus locations
- `/quest/:id` — mission details
- `/log`, `/profile`, `/badges`, and `/leaderboard` — tracking and progression

Discovery and progression share the same local storage for accepted missions, completed missions, and player XP.
