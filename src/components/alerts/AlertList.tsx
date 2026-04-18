import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { de } from "date-fns/locale";
import { SkeletonCard } from "@/components/common/SkeletonCard";
import type { Tables } from "@/integrations/supabase/types";

type Alert = Tables<"alerts">;

const severityConfig = {
  high:   { label: "Kritisch", color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",    icon: <AlertTriangle className="h-4 w-4 text-red-600" /> },
  medium: { label: "Mittel",   color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200", icon: <AlertTriangle className="h-4 w-4 text-yellow-600" /> },
  low:    { label: "Niedrig",  color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200", icon: <AlertTriangle className="h-4 w-4 text-blue-600" /> },
};

interface AlertListProps {
  resolved?: boolean;
}

export function AlertList({ resolved = false }: AlertListProps) {
  const { data: alerts = [], isLoading } = useQuery({
    queryKey: ["alerts", resolved],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("alerts")
        .select("*")
        .eq("resolved", resolved)
        .order("created_at", { ascending: false })
        .limit(50);
      if (error) throw error;
      return (data ?? []) as Alert[];
    },
    staleTime: 60_000,
    refetchInterval: 120_000,
  });

  if (isLoading) return <div className="space-y-4">{[1, 2, 3].map((i) => <SkeletonCard key={i} lines={3} />)}</div>;

  if (alerts.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center gap-2 py-12 text-center">
          <CheckCircle className="h-10 w-10 text-green-500" />
          <p className="text-muted-foreground">
            {resolved ? "Keine abgeschlossenen Warnungen." : "Keine aktiven Warnungen — alles in Ordnung!"}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {alerts.map((alert) => {
        const cfg = severityConfig[alert.severity ?? "low"];
        return (
          <Card key={alert.id} className="border-l-4" style={{ borderLeftColor: alert.severity === "high" ? "#dc2626" : alert.severity === "medium" ? "#d97706" : "#2563eb" }}>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-between gap-2 text-base">
                <div className="flex items-center gap-2">
                  {cfg.icon}
                  <span>{alert.title}</span>
                </div>
                <Badge className={cfg.color}>{cfg.label}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {alert.description && <p className="text-sm text-muted-foreground">{alert.description}</p>}
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                {alert.region && <span className="font-medium">{alert.region}</span>}
                {alert.created_at && (
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {formatDistanceToNow(new Date(alert.created_at), { addSuffix: true, locale: de })}
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
