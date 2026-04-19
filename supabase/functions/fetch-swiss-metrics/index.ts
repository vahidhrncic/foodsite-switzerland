import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface MetricRow {
  key: string;
  value?: number;
  text_value?: string;
  unit: string;
  year: number;
  source: string;
}

// FAO FAOSTAT: Swiss agricultural data (country code CHE = 203)
async function fetchFaoMetrics(): Promise<MetricRow[]> {
  const results: MetricRow[] = [];
  try {
    // Food supply – kcal/capita/day for Switzerland
    const url =
      "https://fenixservices.fao.org/faostat/api/v1/en/data/FBS?area=203&element=664&item=2901&year=2022&output_type=objects";
    const res = await fetch(url, {
      headers: { Accept: "application/json" },
    });
    if (res.ok) {
      const data = await res.json();
      const record = data?.data?.[0];
      if (record?.Value) {
        results.push({
          key: "ch_food_supply_kcal_per_capita",
          value: parseFloat(record.Value),
          unit: "kcal/capita/day",
          year: 2022,
          source: "FAO FAOSTAT",
        });
      }
    }
  } catch (e) {
    console.error("FAO metrics fetch error:", e);
  }
  return results;
}

// World Bank: global food price inflation indicator
async function fetchWorldBankMetrics(): Promise<MetricRow[]> {
  const results: MetricRow[] = [];
  try {
    // FP.CPI.TOTL – CPI for Switzerland (CHE)
    const url =
      "https://api.worldbank.org/v2/country/CHE/indicator/FP.CPI.TOTL?format=json&mrv=1&per_page=1";
    const res = await fetch(url, { headers: { Accept: "application/json" } });
    if (res.ok) {
      const data = await res.json();
      const record = data?.[1]?.[0];
      if (record?.value) {
        results.push({
          key: "ch_cpi_index",
          value: parseFloat(record.value),
          unit: "Index (2010=100)",
          year: record.date ? parseInt(record.date) : new Date().getFullYear(),
          source: "World Bank",
        });
      }
    }
  } catch (e) {
    console.error("World Bank metrics fetch error:", e);
  }
  return results;
}

// Swiss default metrics (always included as baseline)
function defaultSwissMetrics(): MetricRow[] {
  return [
    { key: "swiss_import_value_chf_mrd", value: 12.8, unit: "Mrd. CHF", year: 2022, source: "BLW" },
    { key: "swiss_export_value_chf_mrd", value: 9.8,  unit: "Mrd. CHF", year: 2022, source: "BLW" },
    { key: "swiss_self_sufficiency_pct", value: 54,   unit: "%",         year: 2022, source: "BLW" },
    { key: "ch_cereal_production_kt",    value: 480,  unit: "kt",        year: 2022, source: "BLW" },
    { key: "ch_dairy_production_kt",     value: 3900, unit: "kt",        year: 2022, source: "BLW" },
    { key: "ch_meat_production_kt",      value: 485,  unit: "kt",        year: 2022, source: "BLW" },
    { key: "ch_vegetable_production_kt", value: 445,  unit: "kt",        year: 2022, source: "BLW" },
    { key: "global_food_price_index",    value: 118,  unit: "Index",     year: 2024, source: "FAO" },
  ];
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    );

    const [faoMetrics, wbMetrics] = await Promise.all([
      fetchFaoMetrics(),
      fetchWorldBankMetrics(),
    ]);

    // Merge: live data takes precedence, defaults fill gaps
    const defaults = defaultSwissMetrics();
    const live = [...faoMetrics, ...wbMetrics];
    const liveKeys = new Set(live.map((m) => m.key));
    const merged = [...live, ...defaults.filter((d) => !liveKeys.has(d.key))];

    // Upsert into DB
    const { error } = await supabase
      .from("metrics")
      .upsert(
        merged.map((m) => ({
          key: m.key,
          value: m.value ?? null,
          text_value: m.text_value ?? null,
          unit: m.unit,
          year: m.year,
          source: m.source,
          updated_at: new Date().toISOString(),
        })),
        { onConflict: "key" },
      );

    if (error) console.error("Supabase upsert error:", error);

    return new Response(
      JSON.stringify({ success: true, count: merged.length }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 },
    );
  } catch (err) {
    console.error("fetch-swiss-metrics error:", err);
    return new Response(
      JSON.stringify({ success: false, error: String(err) }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 },
    );
  }
});
