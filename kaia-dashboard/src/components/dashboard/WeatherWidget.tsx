import { CloudSun, Droplets } from "lucide-react";

export function WeatherWidget() {
  return (
    <section className="flex flex-col justify-between rounded-card border border-accent-teal bg-gradient-to-br from-sky-300/30 to-amber-300/20 p-6 shadow-weather min-h-[210px]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-accent-teal">San Francisco, CA</p>
          <p className="mt-1 text-5xl font-semibold text-foreground">72°</p>
        </div>
        <CloudSun className="h-12 w-12 text-accent-goldDark" />
      </div>

      <div className="mt-8 flex items-end justify-between">
        <div>
          <p className="text-base font-medium text-foreground">Mostly Sunny</p>
          <p className="text-sm text-muted">H: 75° L: 62°</p>
        </div>
        <div className="flex items-center gap-2 text-accent-teal">
          <Droplets className="h-5 w-5" />
          <span className="text-sm font-medium">12%</span>
        </div>
      </div>
    </section>
  );
}
