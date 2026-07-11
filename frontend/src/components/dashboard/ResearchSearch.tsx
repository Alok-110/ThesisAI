import { useState } from "react";
import type { FormEvent } from "react";
import type { KeyboardEvent } from "react";

export function ResearchSearch({
  pending,
  onSearch,
}: {
  pending: boolean;
  onSearch: (query: string) => void;
}) {
  const [query, setQuery] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed || pending) return;
    onSearch(trimmed);
    setQuery("");
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && (e.nativeEvent.isComposing || e.keyCode === 229)) {
      e.preventDefault();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-[640px]" role="search">
      <label htmlFor="research-query" className="sr-only">Company name or ticker</label>
      <div className="flex items-center gap-2 rounded-xl border border-input bg-card px-2 py-2 transition-colors focus-within:border-primary/60">
        <input
          id="research-query"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Company name or ticker — e.g. NVIDIA, AAPL"
          autoComplete="off"
          spellCheck={false}
          className="h-10 min-w-0 flex-1 bg-transparent px-3 text-[15px] text-foreground placeholder:text-muted-foreground/70 focus:outline-none"
        />
        <button
          type="submit"
          disabled={pending || !query.trim()}
          className="h-10 shrink-0 rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {pending ? (
            <span className="flex items-center gap-2">
              <span aria-hidden="true" className="size-3.5 animate-spin rounded-full border-[1.5px] border-primary-foreground/40 border-t-primary-foreground" />
              Researching
            </span>
          ) : (
            "Research"
          )}
        </button>
      </div>
    </form>
  );
}