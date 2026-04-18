import { Helmet } from "react-helmet-async";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertList } from "@/components/alerts/AlertList";
import { AlertTriangle, CheckCircle } from "lucide-react";

export default function Alerts() {
  return (
    <>
      <Helmet>
        <title>Warnungen – FoodSite Schweiz</title>
        <meta name="description" content="Aktive Versorgungskettenrisiken und Lebensmittelsicherheitswarnungen für die Schweiz" />
      </Helmet>

      <div className="container py-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Warnungen & Risiken</h1>
          <p className="text-muted-foreground mt-1">
            Aktuelle Bedrohungen für die globale und schweizerische Lebensmittelversorgungskette
          </p>
        </div>

        <Tabs defaultValue="active">
          <TabsList>
            <TabsTrigger value="active" className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Aktive Warnungen
            </TabsTrigger>
            <TabsTrigger value="resolved" className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Abgeschlossen
            </TabsTrigger>
          </TabsList>
          <TabsContent value="active" className="mt-6">
            <AlertList resolved={false} />
          </TabsContent>
          <TabsContent value="resolved" className="mt-6">
            <AlertList resolved={true} />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
