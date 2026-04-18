import { AlertTriangle, X } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function AlertBanner() {
  const [dismissed, setDismissed] = useState(false);

  const { data: count = 0 } = useQuery({
    queryKey: ["active-alert-count"],
    queryFn: async () => {
      const { count: c } = await supabase
        .from("alerts")
        .select("id", { count: "exact", head: true })
        .eq("resolved", false)
        .eq("severity", "high");
      return c ?? 0;
    },
    staleTime: 60_000,
  });

  if (count === 0 || dismissed) return null;

  return (
    <div className="w-full bg-destructive/10 border-b border-destructive/20 px-4 py-2">
      <div className="container flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm text-destructive">
          <AlertTriangle className="h-4 w-4 shrink-0" />
          <span>
            <strong>{count} kritische Warnmeldung{count > 1 ? "en" : ""}</strong> aktiv —{" "}
            <Link to="/alerts" className="underline underline-offset-2 hover:text-destructive/80">
              Alle Warnungen ansehen
            </Link>
          </span>
        </div>
        <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive" onClick={() => setDismissed(true)} aria-label="Schliessen">
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
