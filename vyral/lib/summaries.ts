import type { SupabaseClient } from "@supabase/supabase-js";

export class SummarizeEntryError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SummarizeEntryError";
  }
}

type SummarizeEntryResponse = {
  summary?: string | null;
};

type SummarizeEntryInvokeResult = {
  data: SummarizeEntryResponse | null;
  error: { message: string } | null;
};

export const invokeSummarizeEntry = async (
  client: SupabaseClient,
  entryId: string
): Promise<string> => {
  const { data, error } = (await client.functions.invoke<SummarizeEntryResponse>("summarize-entry", {
    body: { entryId }
  })) as SummarizeEntryInvokeResult;

  if (error) {
    throw new SummarizeEntryError(error.message);
  }

  if (!data?.summary) {
    throw new SummarizeEntryError("Summary not returned");
  }

  return data.summary;
};
