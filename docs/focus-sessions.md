# Focus sessions

## Data model

Focus blocks completed from the Zone screen are stored in the `focus_sessions` table inside Supabase. The schema lives in [`supabase/schema.sql`](../supabase/schema.sql) and is kept in source control so the table can be provisioned alongside the rest of the backend objects.

| Column | Type | Notes |
| --- | --- | --- |
| `id` | `uuid` | Primary key generated via `uuid_generate_v4()`. |
| `user_id` | `uuid` | References `users.id`; cascades on delete so a profile wipe removes the history. |
| `duration_seconds` | `int` | Actual focus time captured (not just the preset). Partial runs log the elapsed seconds before cancellation. |
| `earned_xp` | `int` | XP rewarded for the block. Calculated client-side as 5 XP per rounded focus minute with a 5 XP floor once a full minute has elapsed. Shorter runs record `0`. |
| `was_cancelled` | `boolean` | Indicates whether the run ended early via reset/cancel. Defaults to `false`. |
| `completed_at` | `timestamptz` | Timestamp of when the run was saved. Defaults to `now()`. |

An index on `(user_id, completed_at desc)` accelerates the "recent sessions" lookups used on the Zone screen and any streak calculations.

## XP automation

When the Zone timer reaches zero—or when the user manually resets after making progress—the app inserts a row into `focus_sessions` and awards XP through the shared helper in [`vyral/lib/xp.ts`](../vyral/lib/xp.ts). The helper reads the latest XP value, adds the earned amount, persists it in Supabase, and synchronises the local store so the UI reflects the new total immediately.

The Zone UI treats the latest 10 sessions as the active window for analytics (current streak, minutes logged, XP captured). Alerts confirm when a block has been saved, and partial blocks are marked as "Saved early" in the feed. No push notifications or timed reminders are wired to focus sessions yet; the automation begins and ends with saving the run and applying the XP bonus.
