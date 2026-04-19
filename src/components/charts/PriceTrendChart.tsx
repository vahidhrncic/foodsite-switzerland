import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { SkeletonCard } from "@/components/common/SkeletonCard";
import { format, parseISO } from "date-fns";
import { de } from "date-fns/locale";

const COMMODITIES = ["wheat", "maize", "coffee", "cocoa", "rice", "soybean"];

const PALETTE = [
  "#166534", // forest-800
  "#15803d", // forest-700
  "#16a34a", // forest-600
  "#be123c", // swiss-700
  "#d97706", // amber-600
  "#1d4ed8", // blue-700
];

const LABELS: Record<string, string> = {
  wheat: "Weizen", maize: "Mais", coffee: "Kaffee",
  cocoa: "Kakao", rice: "Reis", soybean: "Soja",
};

interface PriceRow { commodity: string; price: number | null; recorded_at: string; }

export function PriceTrendChart() {
  const { data, isLoading } = useQuery({
    queryKey: ["price-trend"],
    queryFn: async () => {
      const { data: rows, error } = await supabase
        .from("price_data")
        .select("commodity,price,recorded_at")
        .in("commodity", COMMODITIES)
        .order("recorded_at", { ascending: true })
        .limit(500);
      if (error) throw error;

      const byDate: Record<string, Record<string, number>> = {};
      for (const r of (rows ?? []) as PriceRow[]) {
        if (r.price == null) continue;
        const d = r.recorded_at.slice(0, 7);
        byDate[d] ??= {};
        byDate[d][r.commodity] = r.price;
      }

      return Object.entries(byDate)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([date, vals]) => ({
          date,
          label: format(parseISO(`${date}-01`), "MMM yy", { locale: de }),
          ...vals,
        }));
    },
    staleTime: 10 * 60 * 1000,
  });

  if (isLoading) return <SkeletonCard lines={6} />;

  if (!data || data.length === 0) {
    return (
      <div className="rounded-xl bg-card ring-1 ring-border/60 p-6 text-center text-sm text-muted-foreground">
        Noch keine Preisdaten verfügbar. Bitte die Edge Function <code className="font-mono text-xs">fetch-price-data</code> ausführen.
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-card ring-1 ring-border/60 p-4 sm:p-6 shadow-sm">
      <div className="h-[240px] sm:h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="label" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "10px",
                fontSize: 12,
                boxShadow: "0 10px 25px -5px rgba(0,0,0,0.15)",
              }}
              labelStyle={{ fontWeight: 700, marginBottom: 4 }}
              formatter={(v: number, name: string) => [`$${v.toFixed(0)}`, LABELS[name] ?? name]}
            />
            <Legend
              formatter={(v: string) => (
                <span style={{ fontSize: 11, color: "hsl(var(--muted-foreground))" }}>
                  {LABELS[v] ?? v}
                </span>
              )}
            />
            {COMMODITIES.map((c, i) => (
              <Line key={c} type="monotone" dataKey={c} stroke={PALETTE[i]} dot={false} strokeWidth={2} />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
