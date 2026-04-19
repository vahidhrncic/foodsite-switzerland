import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface PriceRecord {
  commodity: string;
  price: number;
  unit: string;
  currency: string;
  recorded_at: string;
  source: string;
}

// World Bank Pink Sheet commodity prices (monthly)
// indicator IDs: wheat PWHEAMT, maize PMAIZMMT, coffee arabica PCOFARBUL, cocoa PCOCOA, sugar PSUGAISAUSA
const WB_COMMODITIES: Record<string, { indicator: string; unit: string }> = {
  wheat:   { indicator: "PWHEAMT",    unit: "$/mt" },
  maize:   { indicator: "PMAIZMMT",   unit: "$/mt" },
  coffee:  { indicator: "PCOFARBUL",  unit: "cents/lb" },
  cocoa:   { indicator: "PCOCOA",     unit: "$/mt" },
  sugar:   { indicator: "PSUGAISAUSA",unit: "cents/lb" },
  rice:    { indicator: "PRICENPQS",  unit: "$/mt" },
  soybean: { indicator: "PSOYB",      unit: "$/mt" },
};

async function fetchWorldBankPrices(): Promise<PriceRecord[]> {
  const results: PriceRecord[] = [];
  const today = new Date();
  const mrv = 6; // last 6 months

  for (const [name, { indicator, unit }] of Object.entries(WB_COMMODITIES)) {
    try {
      const url = `https://api.worldbank.org/v2/en/indicator/${indicator}?format=json&mrv=${mrv}&frequency=M&per_page=${mrv}`;
      const res = await fetch(url, { headers: { Accept: "application/json" } });
      if (!res.ok) continue;

      const data = await res.json();
      const records: { date: string; value: number | null }[] = data?.[1] ?? [];

      for (const r of records) {
        if (r.value == null) continue;
        // date format "2024M01" → "2024-01-01"
        const dateStr = r.date.replace(/M/, "-").replace(/^(\d{4}-\d{2})$/, "$1-01");
        results.push({
          commodity: name,
          price: r.value,
          unit,
          currency: "USD",
          recorded_at: dateStr,
          source: "World Bank Pink Sheet",
        });
      }
    } catch (e) {
      console.error(`Price fetch error for ${name}:`, e);
    }
  }
  return results;
}

// Fallback prices if World Bank is unreachable
function fallbackPrices(): PriceRecord[] {
  const today = new Date().toISOString().slice(0, 10);
  return [
    { commodity: "wheat",   price: 220, unit: "$/mt",      currency: "USD", recorded_at: today, source: "Fallback" },
    { commodity: "maize",   price: 190, unit: "$/mt",      currency: "USD", recorded_at: today, source: "Fallback" },
    { commodity: "coffee",  price: 185, unit: "cents/lb",  currency: "USD", recorded_at: today, source: "Fallback" },
    { commodity: "cocoa",   price: 8500, unit: "$/mt",     currency: "USD", recorded_at: today, source: "Fallback" },
    { commodity: "sugar",   price: 19,  unit: "cents/lb",  currency: "USD", recorded_at: today, source: "Fallback" },
    { commodity: "rice",    price: 560, unit: "$/mt",      currency: "USD", recorded_at: today, source: "Fallback" },
    { commodity: "soybean", price: 370, unit: "$/mt",      currency: "USD", recorded_at: today, source: "Fallback" },
  ];
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    );

    let prices = await fetchWorldBankPrices();
    if (prices.length === 0) prices = fallbackPrices();

    const { error } = await supabase
      .from("price_data")
      .upsert(prices, { onConflict: "commodity,recorded_at" });

    if (error) console.error("Supabase upsert error:", error);

    return new Response(
      JSON.stringify({ success: true, count: prices.length }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 },
    );
  } catch (err) {
    console.error("fetch-price-data error:", err);
    return new Response(
      JSON.stringify({ success: false, error: String(err) }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 },
    );
  }
});
