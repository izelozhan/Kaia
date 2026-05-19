import { useState, useEffect } from "react";

export interface WeatherData {
  city: string;
  temperature: number;
  condition: string;
  high: number;
  low: number;
  precipitation: number;
  weatherCode: number;
}

function getConditionLabel(code: number): string {
  if (code === 0) return "Clear Sky";
  if (code === 1) return "Mostly Clear";
  if (code === 2) return "Partly Cloudy";
  if (code === 3) return "Overcast";
  if (code <= 48) return "Foggy";
  if (code <= 55) return "Light Drizzle";
  if (code <= 67) return "Rainy";
  if (code <= 77) return "Snowy";
  if (code <= 82) return "Rain Showers";
  if (code <= 86) return "Snow Showers";
  return "Thunderstorm";
}

export function useWeather() {
  const [weather, setWeather] = useState<WeatherData | null>(null); //this will either be a weather data obj or null while loading
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        const { latitude, longitude } = coords;
        const [weatherRes, geoRes] = await Promise.all([
          fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}` +
              `&current=temperature_2m,weather_code` +
              `&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max` +
              `&temperature_unit=fahrenheit&forecast_days=1&timezone=auto`,
          ),
          fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
          ),
        ]);

        const weatherJson = await weatherRes.json();
        const geoJson = await geoRes.json();

        const addr = geoJson.address ?? {};
        const city = addr.city ?? addr.town ?? addr.village ?? "Unknown";
        const region = addr.state_code ?? addr.state ?? "";

        setWeather({
          city: region ? `${city}, ${region}` : city,
          temperature: Math.round(weatherJson.current.temperature_2m),
          condition: getConditionLabel(weatherJson.current.weather_code),
          high: Math.round(weatherJson.daily.temperature_2m_max[0]),
          low: Math.round(weatherJson.daily.temperature_2m_min[0]),
          precipitation:
            weatherJson.daily.precipitation_probability_max[0] ?? 0,
          weatherCode: weatherJson.current.weather_code,
        });
        setLoading(false);
      },
      () => {
        setError(true);
        setLoading(false);
      },
    );
  }, []);

  return { weather, loading, error };
}
