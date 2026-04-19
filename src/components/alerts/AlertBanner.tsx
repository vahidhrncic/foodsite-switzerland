import { AlertTriangle, X } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const SESSION_KEY = "alert-banner-dismissed";

export function AlertBanner() {
  const [dismissed, setDismissed] = useState(
    () => sessionStorage.getItem(SESSION_KEY) === "true",
  );

  const { data: count = 0 } = useQuery({
    queryKey: ["active-alert-count-banner"],
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

  const handleDismiss = () => {
    sessionStorage.setItem(SESSION_KEY, "true");
    setDismissed(true);
  };

  return (
    <div className="relative z-30 w-full bg-swiss-600 text-white">
      <div className="container flex items-center justify-between gap-4 py-2.5 px-4">
        <div className="flex items-center gap-3">
          <div className="relative shrink-0">
            <span className="absolute inset-0 rounded-full bg-white/30 animate-pulse-dot" />
            <AlertTriangle className="relative h-4 w-4" />
          </div>
          <p className="text-sm font-semibold">
            {count === 1
              ? "1 kritische Warnmeldung aktiv"
              : `${count} kritische Warnmeldungen aktiv`}
            {" — "}
            <Link to="/alerts" className="underline underline-offset-2 hover:no-underline">
              Alle anzeigen
            </Link>
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 shrink-0 text-white hover:bg-white/20 hover:text-white"
          onClick={handleDismiss}
          aria-label="Schliessen"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
