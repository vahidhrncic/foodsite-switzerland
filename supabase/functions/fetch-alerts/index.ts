import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface AlertRow {
  region: string;
  severity: "high" | "medium" | "low";
  title: string;
  description: string;
  resolved: boolean;
}

// WFP HungerMap: get countries with IPC phase 3+ (crisis or worse)
async function fetchWfpAlerts(): Promise<AlertRow[]> {
  const alerts: AlertRow[] = [];
  try {
    const res = await fetch("https://api.hungermapdata.org/v2/info/country", {
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return [];

    const data = await res.json();
    const countries: { country_name?: string; ipc_phase?: number; population_in_need?: number }[] =
      data?.body?.features?.map((f: { properties: unknown }) => f.properties) ?? [];

    for (const c of countries) {
      if (!c.ipc_phase || c.ipc_phase < 3) continue;
      const severity: "high" | "medium" | "low" =
        c.ipc_phase >= 4 ? "high" : "medium";
      alerts.push({
        region: c.country_name ?? "Unbekannt",
        severity,
        title: `Ernährungskrise: IPC Phase ${c.ipc_phase}`,
        description: `${c.country_name} befindet sich in IPC Phase ${c.ipc_phase} (Krise/Notfall). ${
          c.population_in_need
            ? `${(c.population_in_need / 1_000_000).toFixed(1)}M Menschen betroffen.`
            : ""
        }`,
        resolved: false,
      });
    }
  } catch (e) {
    console.error("WFP alerts fetch error:", e);
  }
  return alerts;
}

// BLV RSS: extract recall/warning items as high-severity alerts
async function fetchBlvAlerts(): Promise<AlertRow[]> {
  const alerts: AlertRow[] = [];
  try {
    const res = await fetch("https://www.blv.admin.ch/blv/de/home.rss.xml", {
      headers: { "User-Agent": "FoodSiteBot/1.0", Accept: "application/rss+xml, */*" },
    });
    if (!res.ok) return [];

    const text = await res.text();
    const items = Array.from(text.matchAll(/<item>([\s\S]*?)<\/item>/gi));

    for (const m of items) {
      const xml = m[1];
      const title = xml.match(/<title[^>]*>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/title>/is)?.[1]?.replace(/<[^>]*>/g, "").trim();
      const desc  = xml.match(/<description[^>]*>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/description>/is)?.[1]?.replace(/<[^>]*>/g, "").trim();

      if (!title) continue;
      const low = title.toLowerCase();
      if (!low.includes("rückruf") && !low.includes("warnung") && !low.includes("gefahr")) continue;

      alerts.push({
        region: "Schweiz",
        severity: "high",
        title,
        description: (desc ?? "").substring(0, 300),
        resolved: false,
      });
    }
  } catch (e) {
    console.error("BLV alerts fetch error:", e);
  }
  return alerts;
}

// Seed alerts so the app always has something to show
function seedAlerts(): AlertRow[] {
  return [
    {
      region: "Ukraine",
      severity: "high",
      title: "Kritische Weizenlieferungen – geopolitisches Risiko",
      description: "Andauernder Konflikt beeinträchtigt Getreideexporte aus der Ukraine (25% des globalen Angebots). Schweizer Importeure diversifizieren Bezugsquellen.",
      resolved: false,
    },
    {
      region: "Westafrika",
      severity: "medium",
      title: "Kakaoproduktion – Dürrerisiko",
      description: "El-Niño-bedingte Trockenheit reduziert Kakaoproduktion an der Elfenbeinküste und in Ghana. Preissteigerungen von 30-40% erwartet.",
      resolved: false,
    },
    {
      region: "Nordsee",
      severity: "low",
      title: "Fischbestände unter Druck",
      description: "MSC warnt vor Überfischung. Quotenkürzungen für 2025 angekündigt.",
      resolved: false,
    },
  ];
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    );

    const [wfp, blv] = await Promise.all([fetchWfpAlerts(), fetchBlvAlerts()]);
    const live = [...wfp, ...blv];

    // Always insert seed alerts if DB is empty
    const { count } = await supabase.from("alerts").select("id", { count: "exact", head: true });
    const toInsert = live.length > 0 ? live : count === 0 ? seedAlerts() : [];

    if (toInsert.length > 0) {
      const { error } = await supabase.from("alerts").insert(toInsert);
      if (error) console.error("Supabase insert error:", error);
    }

    return new Response(
      JSON.stringify({ success: true, inserted: toInsert.length }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 },
    );
  } catch (err) {
    console.error("fetch-alerts error:", err);
    return new Response(
      JSON.stringify({ success: false, error: String(err) }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 },
    );
  }
});
