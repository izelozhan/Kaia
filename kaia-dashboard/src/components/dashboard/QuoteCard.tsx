import { useEffect } from "react";
import { Quote } from "lucide-react";
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
    <section className="relative overflow-hidden rounded-card border border-border bg-surface p-8 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
      <div className="pointer-events-none absolute -left-4 -top-4 h-24 w-24 rounded-full bg-accent-gold/15 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-24 w-24 rounded-full bg-accent-gold/10 blur-3xl" />

      <div className="relative flex flex-col items-center text-center">
        <Quote className="mb-4 h-9 w-9 text-accent-goldDark/80" />

        {quoteLoading && (
          <p className="text-sm text-muted animate-pulse">Loading today's quote…</p>
        )}

        {quoteError && !quoteLoading && (
          <p className="text-sm text-red-400">{quoteError}</p>
        )}

        {quote.text && !quoteLoading && (
          <>
            <blockquote className="max-w-md text-lg leading-relaxed text-foreground">
              &ldquo;{quote.text}&rdquo;
            </blockquote>
            <p className="mt-4 text-sm text-muted">— {quote.author}</p>
          </>
        )}
      </div>
    </section>
  );
}