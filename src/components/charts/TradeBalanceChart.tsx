import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer } from "recharts";
import { ArrowLeftRight } from "lucide-react";
import { SkeletonCard } from "@/components/common/SkeletonCard";

const IMPORT_KEYS = ["swiss_import_value_chf_mrd"];
const EXPORT_KEYS = ["swiss_export_value_chf_mrd"];
const SECTOR_KEYS = [
  "ch_cereal_production_kt",
  "ch_dairy_production_kt",
  "ch_meat_production_kt",
  "ch_vegetable_production_kt",
];

const SECTOR_LABELS: Record<string, string> = {
  ch_cereal_production_kt:    "Getreide",
  ch_dairy_production_kt:     "Milch",
  ch_meat_production_kt:      "Fleisch",
  ch_vegetable_production_kt: "Gemüse",
};

const SECTOR_COLORS = ["#166534", "#15803d", "#16a34a", "#4ade80"];

interface MetricRow {
  key: string;
  value: number | null;
  year: number | null;
}

const tooltipStyle = {
  background: "hsl(var(--card))",
  border: "1px solid hsl(var(--border))",
  borderRadius: "10px",
  fontSize: 12,
  boxShadow: "0 10px 25px -5px rgba(0,0,0,0.15)",
};

export function TradeBalanceChart() {
  const { data, isLoading } = useQuery({
    queryKey: ["trade-balance"],
    queryFn: async () => {
      const allKeys = [...IMPORT_KEYS, ...EXPORT_KEYS, ...SECTOR_KEYS];
      const { data: rows, error } = await supabase
        .from("metrics")
        .select("key,value,year")
        .in("key", allKeys);
      if (error) throw error;

      const map: Record<string, MetricRow> = {};
      for (const r of (rows ?? []) as MetricRow[]) map[r.key] = r;

      return map;
    },
    staleTime: 10 * 60 * 1000,
  });

  if (isLoading) return <SkeletonCard lines={5} />;

  const tradeData = [
    { name: "Import", value: data?.["swiss_import_value_chf_mrd"]?.value ?? 12.8, fill: "#be123c" },
    { name: "Export", value: data?.["swiss_export_value_chf_mrd"]?.value ?? 9.8,  fill: "#166534" },
  ];

  const sectorData = SECTOR_KEYS.map((k) => ({
    name: SECTOR_LABELS[k],
    "kt/Jahr": data?.[k]?.value ?? 0,
  }));

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Trade Balance */}
      <div className="rounded-xl bg-card ring-1 ring-border/60 p-4 sm:p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <ArrowLeftRight className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold">Handelsbalance (Mrd. CHF)</h3>
        </div>
        <div className="h-[200px] sm:h-[240px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={tradeData} margin={{ top: 5, right: 10, left: -15, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} tickLine={false} axisLine={false} unit=" Mrd." />
              <Tooltip
                contentStyle={tooltipStyle}
                labelStyle={{ fontWeight: 700, marginBottom: 4 }}
                formatter={(v: number) => [`${v} Mrd. CHF`, "Wert"]}
              />
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                {tradeData.map((entry, idx) => (
                  <Cell key={idx} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Sector Production */}
      <div className="rounded-xl bg-card ring-1 ring-border/60 p-4 sm:p-6 shadow-sm">
        <h3 className="text-sm font-semibold mb-4">Inländische Produktion nach Sektor (kt)</h3>
        <div className="h-[200px] sm:h-[240px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sectorData} layout="vertical" margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} tickLine={false} axisLine={false} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} tickLine={false} width={58} />
              <Tooltip
                contentStyle={tooltipStyle}
                labelStyle={{ fontWeight: 700, marginBottom: 4 }}
              />
              <Bar dataKey="kt/Jahr" radius={[0, 6, 6, 0]}>
                {sectorData.map((_, idx) => (
                  <Cell key={idx} fill={SECTOR_COLORS[idx % SECTOR_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
