import { serve } from "https://deno.land/std@0.203.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.7";

const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.warn("Missing Supabase configuration for summarize-entry edge function");
}

const supabase = SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY
  ? createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
  : undefined;

type SummarizePayload = {
  entryId?: string;
};

type OpenAIChatResponse = {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
};

serve(async (request) => {
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" }
    });
  }

  if (!supabase) {
    return new Response(JSON.stringify({ error: "Supabase client not configured" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }

  if (!OPENAI_API_KEY) {
    return new Response(JSON.stringify({ error: "Missing OPENAI_API_KEY" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }

  let payload: SummarizePayload;
  try {
    payload = await request.json();
  } catch (error) {
    console.error("Failed to parse request payload", error);
    return new Response(JSON.stringify({ error: "Invalid JSON payload" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }

  const entryId = payload.entryId;
  if (!entryId) {
    return new Response(JSON.stringify({ error: "entryId is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }

  const { data: entry, error: entryError } = await supabase
    .from("entries")
    .select("id, content, user_id")
    .eq("id", entryId)
    .single();

  if (entryError || !entry) {
    console.error("Unable to load entry", entryError);
    return new Response(JSON.stringify({ error: "Entry not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" }
    });
  }

  const prompt = `Summarize this journal entry written by the user in 2 concise sentences. Highlight the main themes and tone. Entry: \n${entry.content ?? ""}`;

  let summary: string | undefined;
  try {
    const aiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are an assistant that summarizes personal journal entries in a warm, encouraging voice."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.4,
        max_tokens: 200
      })
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error("OpenAI API error", errorText);
      return new Response(JSON.stringify({ error: "Failed to generate summary" }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }

    const completion = (await aiResponse.json()) as OpenAIChatResponse;
    summary = completion.choices?.[0]?.message?.content?.trim();
  } catch (error) {
    console.error("OpenAI request failed", error);
    return new Response(JSON.stringify({ error: "AI request failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }

  if (!summary) {
    return new Response(JSON.stringify({ error: "Summary was empty" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }

  const { error: updateError } = await supabase
    .from("entries")
    .update({ summary })
    .eq("id", entryId);

  if (updateError) {
    console.error("Failed to persist summary", updateError);
    return new Response(JSON.stringify({ error: "Failed to store summary" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }

  return new Response(JSON.stringify({ summary }), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
});
