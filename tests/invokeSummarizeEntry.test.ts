import test from "node:test";
import assert from "node:assert/strict";
import { invokeSummarizeEntry, SummarizeEntryError } from "../vyral/lib/summaries";

type InvokeArgs = Parameters<typeof invokeSummarizeEntry>;

test("invokeSummarizeEntry returns the summary when provided", async () => {
  const mockClient = {
    functions: {
      invoke: async () => ({
        data: { summary: "A short recap." },
        error: null
      })
    }
  } as unknown as InvokeArgs[0];

  const summary = await invokeSummarizeEntry(mockClient, "entry-id");
  assert.equal(summary, "A short recap.");
});

test("invokeSummarizeEntry throws when Supabase returns an error", async () => {
  const mockClient = {
    functions: {
      invoke: async () => ({
        data: null,
        error: { message: "Function failure" }
      })
    }
  } as unknown as InvokeArgs[0];

  await assert.rejects(() => invokeSummarizeEntry(mockClient, "entry-id"), (error) => {
    assert.ok(error instanceof SummarizeEntryError);
    assert.equal(error.message, "Function failure");
    return true;
  });
});

test("invokeSummarizeEntry throws when summary is missing", async () => {
  const mockClient = {
    functions: {
      invoke: async () => ({
        data: {},
        error: null
      })
    }
  } as unknown as InvokeArgs[0];

  await assert.rejects(() => invokeSummarizeEntry(mockClient, "entry-id"), (error) => {
    assert.ok(error instanceof SummarizeEntryError);
    assert.equal(error.message, "Summary not returned");
    return true;
  });
});
