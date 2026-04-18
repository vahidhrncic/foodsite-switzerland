import { Helmet } from "react-helmet-async";
import { RealtimeMetrics } from "@/components/dashboard/RealtimeMetrics";
import { SupplyChainMap } from "@/components/dashboard/SupplyChainMap";
import { SwissDetails } from "@/components/dashboard/SwissDetails";
import { NewsFeed } from "@/components/dashboard/NewsFeed";
import { AlertBanner } from "@/components/alerts/AlertBanner";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Dashboard – FoodSite Schweiz</title>
        <meta name="description" content="Echtzeit-Monitoring und Analyse globaler Lebensmittelversorgungsketten mit Fokus Schweiz" />
        <meta property="og:title" content="FoodSite Schweiz – Lebensmittelversorgung" />
        <meta property="og:description" content="Globale Versorgungskettenüberwachung, Rohstoffpreise und Warnmeldungen" />
      </Helmet>

      <AlertBanner />

      <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
            Lebensmittelversorgung Übersicht
          </h1>
          <p className="text-muted-foreground">
            Echtzeit-Monitoring und Analyse globaler Lebensmittelversorgungsketten
          </p>
        </div>

        <div className="space-y-6">
          <RealtimeMetrics />
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <SupplyChainMap />
            <NewsFeed />
          </div>
          <SwissDetails />
        </div>
      </div>
    </>
  );
};

export default Index;
