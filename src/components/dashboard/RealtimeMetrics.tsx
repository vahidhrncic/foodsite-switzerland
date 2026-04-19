import { Package, TrendingUp, Leaf, BarChart2 } from "lucide-react";
import { MetricsCard } from "./MetricsCard";
import { SkeletonCard } from "@/components/common/SkeletonCard";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface Metric { key: string; value: number | null; unit: string | null; year: number | null; source?: string | null; }

const KEYS = [
  "swiss_import_value_chf_mrd",
  "swiss_export_value_chf_mrd",
  "swiss_self_sufficiency_pct",
  "global_food_price_index",
];

const DEFAULTS: Record<string, { display: string; description: string }> = {
  swiss_import_value_chf_mrd: { display: "12.8 Mrd. CHF", description: "Importwert 2022 · BLW" },
  swiss_export_value_chf_mrd: { display: "9.8 Mrd. CHF",  description: "Exportwert 2022 · BLW" },
  swiss_self_sufficiency_pct: { display: "54%",            description: "Selbstversorgung 2022 · Agristat" },
  global_food_price_index:    { display: "118 Pkt.",       description: "FAO Preisindex 2024" },
};

function fmt(m: Metric | undefined, key: string): string {
  if (m?.value != null) return `${m.value}${m.unit ? ` ${m.unit}` : ""}`;
  return DEFAULTS[key]?.display ?? "—";
}
function desc(m: Metric | undefined, key: string): string {
  if (m?.year != null) return `Stand ${m.year} · ${m.source ?? "DB"}`;
  return DEFAULTS[key]?.description ?? "";
}

const CARDS: Array<{
  key: string;
  title: string;
  icon: React.ReactNode;
  accentColor: "green" | "red" | "blue" | "amber";
  trend: "up" | "down" | "flat";
}> = [
  { key: "swiss_import_value_chf_mrd", title: "Lebensmittelimporte",   icon: <Package   className="h-4 w-4" />, accentColor: "red",   trend: "up" },
  { key: "swiss_export_value_chf_mrd", title: "Lebensmittelexporte",   icon: <TrendingUp className="h-4 w-4" />, accentColor: "green", trend: "up" },
  { key: "swiss_self_sufficiency_pct", title: "Selbstversorgungsgrad", icon: <Leaf       className="h-4 w-4" />, accentColor: "green", trend: "flat" },
  { key: "global_food_price_index",    title: "FAO Preisindex",         icon: <BarChart2  className="h-4 w-4" />, accentColor: "amber", trend: "down" },
];

export function RealtimeMetrics() {
  const { data, isLoading } = useQuery({
    queryKey: ["metrics", KEYS],
    queryFn: async () => {
      const { data: rows, error } = await supabase
        .from("metrics")
        .select("key,value,unit,year,source")
        .in("key", KEYS);
      if (error) throw error;
      const map: Record<string, Metric> = {};
      for (const row of (rows ?? []) as Metric[]) map[row.key] = row;
      return map;
    },
    staleTime: 10 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {KEYS.map((k) => <SkeletonCard key={k} header={false} lines={2} />)}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 stagger">
      {CARDS.map(({ key, title, icon, accentColor, trend }) => (
        <div key={key} className="animate-fade-up">
          <MetricsCard
            title={title}
            value={fmt(data?.[key], key)}
            icon={icon}
            description={desc(data?.[key], key)}
            accentColor={accentColor}
            trend={trend}
          />
        </div>
      ))}
    </div>
  );
}
