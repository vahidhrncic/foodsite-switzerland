import { Helmet } from "react-helmet-async";
import { RealtimeMetrics } from "@/components/dashboard/RealtimeMetrics";
import { SupplyChainMap } from "@/components/dashboard/SupplyChainMap";
import { SwissDetails } from "@/components/dashboard/SwissDetails";
import { NewsFeed } from "@/components/dashboard/NewsFeed";
import { AlertBanner } from "@/components/alerts/AlertBanner";
import { Activity } from "lucide-react";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Dashboard – FoodSite Schweiz</title>
        <meta name="description" content="Echtzeit-Monitoring globaler Lebensmittelversorgungsketten mit Fokus Schweiz" />
        <meta property="og:title" content="FoodSite Schweiz – Lebensmittelversorgung" />
        <meta property="og:description" content="Versorgungskettenüberwachung, Rohstoffpreise und Warnmeldungen" />
      </Helmet>

      <AlertBanner />

      {/* Hero */}
      <div className="page-hero border-b">
        <div className="container py-8 md:py-10">
          <div className="flex items-start justify-between gap-4">
            <div className="animate-fade-up">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-forest-100 dark:bg-forest-900/40 px-2.5 py-1 text-xs font-semibold text-forest-700 dark:text-forest-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-forest-500 animate-pulse-dot" />
                  Live
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
                Lebensmittelversorgung
                <span className="block text-primary">Schweiz</span>
              </h1>
              <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-lg">
                Echtzeit-Monitoring globaler Versorgungsketten, Rohstoffpreise und Risiken.
              </p>
            </div>
            <div className="hidden sm:flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Activity className="h-8 w-8" />
            </div>
          </div>
        </div>
      </div>

      <div className="container py-6 space-y-6">
        {/* KPI row */}
        <RealtimeMetrics />

        {/* Map full-width */}
        <SupplyChainMap />

        {/* Swiss details + news feed */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <SwissDetails />
          </div>
          <div className="lg:col-span-1">
            <NewsFeed />
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
