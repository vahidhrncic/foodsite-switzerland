import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { SkeletonCard } from "@/components/common/SkeletonCard";
import { format, parseISO } from "date-fns";
import { de } from "date-fns/locale";

const COMMODITIES = ["wheat", "maize", "coffee", "cocoa", "rice", "soybean"];
const COLORS = ["#2563eb", "#16a34a", "#d97706", "#dc2626", "#7c3aed", "#0891b2"];

const LABELS: Record<string, string> = {
  wheat: "Weizen", maize: "Mais", coffee: "Kaffee",
  cocoa: "Kakao", rice: "Reis", soybean: "Soja",
};

interface PriceRow {
  commodity: string;
  price: number | null;
  recorded_at: string;
}

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

      // Pivot: group by date
      const byDate: Record<string, Record<string, number>> = {};
      for (const r of (rows ?? []) as PriceRow[]) {
        if (r.price == null) continue;
        const d = r.recorded_at.slice(0, 7); // YYYY-MM
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
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Rohstoffpreisentwicklung
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground py-8 text-center">
          Noch keine Preisdaten verfügbar. Bitte später wiederkommen.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Rohstoffpreisentwicklung (USD)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="label" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip
              contentStyle={{ background: "hsl(var(--background))", border: "1px solid hsl(var(--border))" }}
              labelStyle={{ fontWeight: 600 }}
            />
            <Legend formatter={(v: string) => LABELS[v] ?? v} />
            {COMMODITIES.map((c, i) => (
              <Line
                key={c}
                type="monotone"
                dataKey={c}
                name={c}
                stroke={COLORS[i]}
                dot={false}
                strokeWidth={2}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
