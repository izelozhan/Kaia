import { BookOpen, ExternalLink, Globe, Podcast } from "lucide-react";
import { useAppStore } from "@/stores/useAppStore";

const icons = [Globe, BookOpen, Podcast, ExternalLink];

export function LinkVault() {
  const links = useAppStore((s) => s.links);

  return (
    <section className="rounded-card border border-border bg-surface p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
      <h2 className="mb-4 text-2xl font-semibold text-foreground">Curated Links</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {links.map((link, i) => {
          const Icon = icons[i % icons.length];
          return (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-lg bg-background px-3 py-3 transition hover:ring-1 hover:ring-accent-teal/30"
            >
              <Icon className="h-5 w-5 shrink-0 text-accent-teal" />
              <span className="truncate text-sm font-medium text-foreground">
                {link.title}
              </span>
            </a>
          );
        })}
      </div>
    </section>
  );
}
