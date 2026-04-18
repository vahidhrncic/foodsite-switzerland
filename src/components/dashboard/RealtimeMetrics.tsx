import { TrendingUp, TrendingDown, Package, Leaf } from "lucide-react";
import { MetricsCard } from "./MetricsCard";
import { SkeletonCard } from "@/components/common/SkeletonCard";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface Metric {
  key: string;
  value: number | null;
  unit: string | null;
  year: number | null;
}

const KEYS = [
  "swiss_import_value_chf_mrd",
  "swiss_export_value_chf_mrd",
  "swiss_self_sufficiency_pct",
  "global_food_price_index",
];

const DEFAULTS: Record<string, { display: string; description: string }> = {
  swiss_import_value_chf_mrd: { display: "12.8 Mrd. CHF", description: "Importwert 2022 (Quelle: BLW)" },
  swiss_export_value_chf_mrd: { display: "9.8 Mrd. CHF",  description: "Exportwert 2022 (Quelle: BLW)" },
  swiss_self_sufficiency_pct: { display: "54%",            description: "Netto 2022 (Quelle: Agristat)" },
  global_food_price_index:    { display: "118 Pkt.",       description: "FAO Nahrungsmittelpreisindex 2024" },
};

function fmt(m: Metric | undefined, key: string): string {
  if (m?.value != null) return `${m.value}${m.unit ? ` ${m.unit}` : ""}`;
  return DEFAULTS[key]?.display ?? "—";
}

function desc(m: Metric | undefined, key: string): string {
  if (m?.year != null) return `Stand ${m.year} (Quelle: ${(m as Metric & { source?: string }).source ?? "DB"})`;
  return DEFAULTS[key]?.description ?? "";
}

export function RealtimeMetrics() {
  const { data, isLoading } = useQuery({
    queryKey: ["metrics", KEYS],
    queryFn: async () => {
      const { data: rows, error } = await supabase
        .from("metrics")
        .select("key,value,unit,year,source")
        .in("key", KEYS);
      if (error) throw error;
      const map: Record<string, Metric & { source?: string }> = {};
      for (const row of (rows ?? []) as (Metric & { source?: string })[]) map[row.key] = row;
      return map;
    },
    staleTime: 10 * 60 * 1000,
  });

  const cards = [
    { key: "swiss_import_value_chf_mrd", title: "Lebensmittelimporte",     icon: <Package     className="h-5 w-5 text-muted-foreground" /> },
    { key: "swiss_export_value_chf_mrd", title: "Lebensmittelexporte",     icon: <TrendingUp  className="h-5 w-5 text-muted-foreground" /> },
    { key: "swiss_self_sufficiency_pct", title: "Selbstversorgungsgrad",   icon: <Leaf        className="h-5 w-5 text-muted-foreground" /> },
    { key: "global_food_price_index",    title: "FAO Preisindex",           icon: <TrendingDown className="h-5 w-5 text-muted-foreground" /> },
  ];

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {KEYS.map((k) => <SkeletonCard key={k} header={false} lines={2} />)}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map(({ key, title, icon }) => (
        <MetricsCard
          key={key}
          title={title}
          value={fmt(data?.[key], key)}
          icon={icon}
          description={desc(data?.[key], key)}
        />
      ))}
    </div>
  );
}
