import { useEffect } from "react";
import { Bookmark } from "lucide-react";
import { useAppStore } from "@/stores/useAppStore";
import { todayKey } from "@/lib/utils";

export function QuoteCard() {
  const { quote, quoteLoading, quoteError, fetchQuote } = useAppStore();

  useEffect(() => {
    if (quote.dateKey !== todayKey()) {
      fetchQuote();
    }
  }, []);

  return (
    <section className="flex flex-col rounded-2xl border border-border bg-background p-5 shadow-card">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted">Today's Vibe</p>
        <Bookmark className="h-4 w-4 text-muted" />
      </div>

      {quoteLoading && (
        <p className="text-sm text-muted animate-pulse">Loading…</p>
      )}

      {quoteError && !quoteLoading && (
        <p className="text-sm text-red-400">{quoteError}</p>
      )}

      {quote.text && !quoteLoading && (
        <div className="flex flex-col gap-3">
          <blockquote className="font-logo text-sm italic leading-relaxed text-foreground">
            &ldquo;{quote.text}&rdquo;
          </blockquote>
          <p className="text-xs text-muted">— Your Buddy Kaia</p>
        </div>
      )}
    </section>
  );
}