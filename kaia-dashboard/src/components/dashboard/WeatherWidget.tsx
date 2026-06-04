import { CloudSun, Sun, Cloud, CloudRain, CloudSnow, Zap, Droplets } from "lucide-react";
import { useWeather } from "../../hooks/useWeather";

function WeatherIcon({ code }: { code: number }) {
  if (code === 0)  return <Sun       className="h-12 w-12 text-white/90" />;
  if (code <= 3)   return <CloudSun  className="h-12 w-12 text-white/90" />;
  if (code <= 48)  return <Cloud     className="h-12 w-12 text-white/70" />;
  if (code <= 82)  return <CloudRain className="h-12 w-12 text-white/80" />;
  if (code <= 86)  return <CloudSnow className="h-12 w-12 text-white/80" />;
  return                  <Zap       className="h-12 w-12 text-white/90" />;
}

export function WeatherWidget() {

  const { weather, loading, error } = useWeather();

  if(loading){
    return (
      <section className="flex flex-col items-center justify-center rounded-card bg-accent-gold p-6 shadow-weather min-h-[210px]">
         <p className="text-sm text-white/70">Fetching weather…</p>
      </section>
    )
  }

  if (error || !weather) {
    return (
      <section className="flex flex-col items-center justify-center rounded-card bg-accent-gold p-6 shadow-weather min-h-[210px]">
        <p className="text-sm text-white/70">Weather unavailable</p>
      </section>
    );
  }

  return (
    <section className="flex flex-col justify-between rounded-card bg-accent-gold p-6 shadow-weather min-h-[210px]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-white/80">{weather.city}</p>
          <p className="mt-1 text-5xl font-semibold text-white">{weather.temperature}°</p>
        </div>
        <WeatherIcon code={weather.weatherCode} />
      </div>

      <div className="mt-8 flex items-end justify-between">
        <div>
          <p className="text-base font-medium text-white">{weather.condition}</p>
          <p className="text-sm text-white/70">H: {weather.high}° L: {weather.low}°</p>
        </div>
        <div className="flex items-center gap-2 text-white/80">
          <Droplets className="h-5 w-5" />
          <span className="text-sm font-medium">{weather.precipitation}%</span>
        </div>
      </div>
    </section>
  );
}