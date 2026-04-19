import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Clock, CheckCircle2, AlertTriangle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { de } from "date-fns/locale";
import { SkeletonCard } from "@/components/common/SkeletonCard";
import { cn } from "@/lib/utils";
import type { Tables } from "@/integrations/supabase/types";

type Alert = Tables<"alerts">;

const SEV = {
  high: {
    label: "Kritisch",
    dot: "bg-red-500",
    card: "border-l-4 border-l-red-500 bg-red-50/60 dark:bg-red-950/25",
    badge: "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300",
  },
  medium: {
    label: "Mittel",
    dot: "bg-amber-400",
    card: "border-l-4 border-l-amber-400 bg-amber-50/60 dark:bg-amber-950/20",
    badge: "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300",
  },
  low: {
    label: "Niedrig",
    dot: "bg-blue-400",
    card: "border-l-4 border-l-blue-400",
    badge: "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300",
  },
} as const;

interface AlertListProps { resolved?: boolean; }

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

  if (isLoading) {
    return <div className="space-y-3">{[1, 2, 3].map((i) => <SkeletonCard key={i} lines={3} />)}</div>;
  }

  if (alerts.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 py-16 text-center">
        <CheckCircle2 className="h-10 w-10 text-forest-500" />
        <p className="text-sm text-muted-foreground">
          {resolved ? "Keine abgeschlossenen Warnungen." : "Keine aktiven Warnungen — alles in Ordnung!"}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {alerts.map((alert) => {
        const sev = SEV[alert.severity ?? "low"];
        return (
          <div key={alert.id} className={cn("rounded-xl p-4 shadow-sm", sev.card)}>
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-2.5 min-w-0">
                <div className="mt-0.5 relative shrink-0">
                  {!resolved && alert.severity === "high" && (
                    <span className={cn("absolute inset-0 rounded-full animate-pulse-dot opacity-60", sev.dot)} />
                  )}
                  <AlertTriangle className={cn("relative h-4 w-4", alert.severity === "high" ? "text-red-600" : alert.severity === "medium" ? "text-amber-500" : "text-blue-500")} />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold leading-snug">{alert.title}</p>
                  {alert.region && (
                    <p className="text-xs text-muted-foreground mt-0.5">{alert.region}</p>
                  )}
                </div>
              </div>
              <span className={cn("shrink-0 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide", sev.badge)}>
                <span className={cn("h-1.5 w-1.5 rounded-full", sev.dot)} />
                {sev.label}
              </span>
            </div>

            {alert.description && (
              <p className="text-sm text-muted-foreground mt-2.5 leading-relaxed">{alert.description}</p>
            )}

            {alert.created_at && (
              <div className="flex items-center gap-1 mt-3 text-[11px] text-muted-foreground">
                <Clock className="h-3 w-3" />
                {formatDistanceToNow(new Date(alert.created_at), { addSuffix: true, locale: de })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
