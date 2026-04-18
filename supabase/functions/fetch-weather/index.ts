import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Key agricultural growing regions relevant to Switzerland's food supply
const REGIONS = [
  { name: "Schweiz – Mittelland",    lat: 47.0,  lon: 7.5  },
  { name: "Ukraine – Kiewer Gebiet", lat: 50.45, lon: 30.52 },
  { name: "Elfenbeinküste",          lat: 7.54,  lon: -5.55 },
  { name: "Äthiopien – Kaffa",       lat: 7.19,  lon: 36.57 },
  { name: "Brasilien – São Paulo",   lat: -23.5, lon: -46.6 },
  { name: "Indien – Punjab",         lat: 30.9,  lon: 75.85 },
];

interface WeatherResult {
  region: string;
  lat: number;
  lon: number;
  temperature_max: number | null;
  temperature_min: number | null;
  precipitation_sum: number | null;
  condition: string;
}

async function fetchWeather(region: { name: string; lat: number; lon: number }): Promise<WeatherResult> {
  try {
    const url = new URL("https://api.open-meteo.com/v1/forecast");
    url.searchParams.set("latitude",  String(region.lat));
    url.searchParams.set("longitude", String(region.lon));
    url.searchParams.set("daily",     "temperature_2m_max,temperature_2m_min,precipitation_sum");
    url.searchParams.set("forecast_days", "1");
    url.searchParams.set("timezone",  "auto");

    const res = await fetch(url.toString());
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();
    const tmax  = data?.daily?.temperature_2m_max?.[0] ?? null;
    const tmin  = data?.daily?.temperature_2m_min?.[0] ?? null;
    const prec  = data?.daily?.precipitation_sum?.[0] ?? null;

    let condition = "normal";
    if (prec !== null && prec > 30)  condition = "heavy_rain";
    if (tmax !== null && tmax > 38)  condition = "heatwave";
    if (tmax !== null && tmax < -10) condition = "frost";

    return { region: region.name, lat: region.lat, lon: region.lon, temperature_max: tmax, temperature_min: tmin, precipitation_sum: prec, condition };
  } catch (e) {
    console.error(`Weather fetch error for ${region.name}:`, e);
    return { region: region.name, lat: region.lat, lon: region.lon, temperature_max: null, temperature_min: null, precipitation_sum: null, condition: "unknown" };
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const results = await Promise.all(REGIONS.map(fetchWeather));

    return new Response(
      JSON.stringify({ weather: results }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 },
    );
  } catch (err) {
    console.error("fetch-weather error:", err);
    return new Response(
      JSON.stringify({ success: false, error: String(err) }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 },
    );
  }
});
