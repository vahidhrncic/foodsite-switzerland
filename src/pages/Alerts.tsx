import { Helmet } from "react-helmet-async";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertList } from "@/components/alerts/AlertList";
import { AlertTriangle, CheckCircle2, ShieldAlert } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

function useAlertStats() {
  return useQuery({
    queryKey: ["alert-stats"],
    queryFn: async () => {
      const [{ count: active }, { count: resolved }] = await Promise.all([
        supabase.from("alerts").select("id", { count: "exact", head: true }).eq("resolved", false),
        supabase.from("alerts").select("id", { count: "exact", head: true }).eq("resolved", true),
      ]);
      return { active: active ?? 0, resolved: resolved ?? 0 };
    },
    staleTime: 60_000,
  });
}

export default function Alerts() {
  const { data: stats } = useAlertStats();

  return (
    <>
      <Helmet>
        <title>Warnungen – FoodSite Schweiz</title>
        <meta name="description" content="Aktive Versorgungskettenrisiken und Lebensmittelsicherheitswarnungen" />
      </Helmet>

      {/* Hero */}
      <div className="page-hero border-b">
        <div className="container py-8">
          <div className="flex items-start gap-4 animate-fade-up">
            <div className="hidden sm:flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-swiss-100 dark:bg-swiss-900/30 text-swiss-600 dark:text-swiss-400">
              <ShieldAlert className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Warnungen & Risiken</h1>
              <p className="text-muted-foreground mt-1 text-sm">
                Aktuelle Bedrohungen für die globale und schweizerische Lebensmittelversorgungskette
              </p>
            </div>
            {stats && (
              <div className="hidden md:flex items-center gap-6">
                <div className="text-center">
                  <p className="text-3xl font-extrabold text-swiss-600 dark:text-swiss-400 tabular-nums">{stats.active}</p>
                  <p className="text-[11px] text-muted-foreground uppercase tracking-wide font-semibold">Aktiv</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-extrabold text-forest-600 dark:text-forest-400 tabular-nums">{stats.resolved}</p>
                  <p className="text-[11px] text-muted-foreground uppercase tracking-wide font-semibold">Gelöst</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container py-6">
        <Tabs defaultValue="active">
          <TabsList className="w-full sm:w-auto mb-6 grid grid-cols-2 sm:inline-flex h-10 rounded-lg bg-muted p-1">
            <TabsTrigger value="active" className="flex items-center gap-2 rounded-md text-sm font-medium">
              <AlertTriangle className="h-3.5 w-3.5" />
              Aktive Warnungen
              {stats?.active ? (
                <span className="ml-1 rounded-full bg-swiss-600 text-white text-[10px] font-bold px-1.5 py-0.5 leading-none">
                  {stats.active}
                </span>
              ) : null}
            </TabsTrigger>
            <TabsTrigger value="resolved" className="flex items-center gap-2 rounded-md text-sm font-medium">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Abgeschlossen
            </TabsTrigger>
          </TabsList>
          <TabsContent value="active">
            <AlertList resolved={false} />
          </TabsContent>
          <TabsContent value="resolved">
            <AlertList resolved={true} />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
