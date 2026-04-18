import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

interface MetricRow {
  key: string;
  value: number | null;
  year: number | null;
}

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
    { name: "Import", value: data?.["swiss_import_value_chf_mrd"]?.value ?? 12.8, fill: "#dc2626" },
    { name: "Export", value: data?.["swiss_export_value_chf_mrd"]?.value ?? 9.8,  fill: "#16a34a" },
  ];

  const sectorData = SECTOR_KEYS.map((k) => ({
    name: SECTOR_LABELS[k],
    "kt/Jahr": data?.[k]?.value ?? 0,
  }));

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ArrowLeftRight className="h-5 w-5" />
            Handelsbalance (Mrd. CHF)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={tradeData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} unit=" Mrd." />
              <Tooltip
                contentStyle={{ background: "hsl(var(--background))", border: "1px solid hsl(var(--border))" }}
                formatter={(v: number) => [`${v} Mrd. CHF`]}
              />
              <Bar dataKey="value" name="Wert" radius={[4, 4, 0, 0]}>
                {tradeData.map((entry, idx) => (
                  <rect key={idx} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Inländische Produktion nach Sektor (kt)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={sectorData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} width={60} />
              <Tooltip
                contentStyle={{ background: "hsl(var(--background))", border: "1px solid hsl(var(--border))" }}
              />
              <Bar dataKey="kt/Jahr" fill="#2563eb" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
