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

### AI Summaries

The Skrybe module can generate AI summaries for each journal entry via a Supabase Edge Function.

1. Provision the secrets the function needs in your Supabase project:

   ```bash
   supabase secrets set OPENAI_API_KEY=sk-... \
     SUPABASE_URL=https://your-project.supabase.co \
     SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```

2. Deploy the edge function:

   ```bash
   supabase functions deploy summarize-entry --project-ref <project-ref>
   ```

3. Call the function locally (optional) with the Supabase CLI to verify connectivity:

   ```bash
   supabase functions invoke summarize-entry --no-verify-jwt --body '{"entryId":"<uuid>"}'
   ```

The edge function reads the entry content, requests a concise summary from your configured LLM provider (OpenAI by default), stores it back into the `entries.summary` column, and returns the generated text to the client.

### Database

Run the provided SQL to bootstrap the Supabase backend.

```bash
supabase db push --file supabase/schema.sql
supabase db push --file supabase/seed.sql
```

Run the automated checks (including the summary service mock tests):

```bash
pnpm test

=======
## Rewards & Points

- Player currency lives on `users.points`. The bootstrap hook hydrates it into the `useUserStore` profile so UI modules can read a live balance.
- Award points whenever you grant XP (e.g. finishing a challenge, logging a habit) by incrementing `users.points` in the same Supabase mutation that updates XP.
- The Shop checks the cached balance before unlocking a theme. When a purchase succeeds it atomically deducts the cost, equips the theme, and refreshes both the customization query and the user store.
- Seeds grant the demo account 600 pts so you can immediately test unlock flows.

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
