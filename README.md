# Vyral Monorepo

Vyral is the flagship experience inside the future V’erse suite. This monorepo hosts a TypeScript-first Expo application with modular architecture so each module can graduate into its own mini-app.

## Tech Stack
- Expo 50 with Expo Router
- React Native (iOS, Android, Web)
- TypeScript (strict)
- Zustand + React Query
- Supabase (auth, database, storage)
- NativeWind (Tailwind CSS for RN)
- Neon glass cyber theme powered by Expo Linear Gradient & BlurView
- Zod validation

## Getting Started

1. **Install dependencies**
   ```bash
   pnpm install
   ```
2. **Start the Expo app**
   ```bash
   cd vyral
   npx expo start
   ```
3. Use the QR code or platform specific commands from the Expo CLI to launch iOS, Android, or Web.

### Environment Variables

Create a `.env` file (or configure Expo secrets) with your Supabase project keys:

```
EXPO_PUBLIC_SUPABASE_URL=your-url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### Database

Run the provided SQL to bootstrap the Supabase backend.

```bash
supabase db push --file supabase/schema.sql
supabase db push --file supabase/seed.sql
```

### XP System

Kor levels are powered by the `users.xp` column. XP is awarded via the `grant_xp` stored procedure, which records a row in
`xp_transactions` before incrementing the running total. Current earn events include:

- **Challenge enlistment (Stryke):** Joining a challenge logs a `challenge_participants` record and grants the challenge’s
  `xp_reward` value.
- **Habit log (Lyfe):** Each tap of “Log again” adds a `habit_logs` entry and rewards **15 XP**.
- **Focus session (Zone):** Completing a timer session inserts into `focus_sessions` and grants **4 XP per minute** focused.

These inserts keep Kor’s dashboard and streaks in sync thanks to React Query cache invalidations and the global
`useUserStore` profile update helpers.

## Project Structure

```
/vyral
  app/            # Expo Router routes for each V’erse module
  components/     # Shared UI primitives (neon glass cards, buttons, etc.)
  lib/            # Supabase client, React Query configuration, bootstrap hooks
  store/          # Zustand stores
  theme/          # Theme tokens and providers
  tailwind.config.js
supabase/         # Database schema & seeds
```

Each module (Kor, Stryke, Skrybe, Zone, Lyfe, Tree, Board, Shop, Vyra) is encapsulated so it can later evolve into a standalone micro-app under the V’erse umbrella.

## Linting & Type Checking

From the repo root:

```bash
pnpm lint
pnpm typecheck
```

## Credits

Crafted with luminescent love for the Vyral launch.
