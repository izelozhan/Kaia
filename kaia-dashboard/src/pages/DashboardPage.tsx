import { PomodoroCard } from "@/components/dashboard/PomodoroCard";
import { RitualsCard } from "@/components/dashboard/RitualsCard";
import { WeatherWidget } from "@/components/dashboard/WeatherWidget";
import { StickyNotesStack } from "@/components/dashboard/StickyNotesStack";
import { LinkVault } from "@/components/dashboard/LinkVault";
import { QuoteCard } from "@/components/dashboard/QuoteCard";

export function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col gap-6">
        <PomodoroCard />
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <RitualsCard />
        <WeatherWidget />
        <StickyNotesStack />
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <LinkVault />
        <QuoteCard />
      </section>
    </div>
  );
}
