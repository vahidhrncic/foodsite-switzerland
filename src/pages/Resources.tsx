import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

const SOURCES = [
  {
    category: "Schweizer Behörden",
    items: [
      { name: "BLW – Bundesamt für Landwirtschaft", url: "https://www.blw.admin.ch", desc: "Agrarpolitik, Marktbeobachtung, Statistiken" },
      { name: "BFS – Bundesamt für Statistik",       url: "https://www.bfs.admin.ch", desc: "Nahrungsmittelpreisindizes, Konsumstatistiken" },
      { name: "BLV – Lebensmittelsicherheit",         url: "https://www.blv.admin.ch", desc: "Lebensmittelrückrufe, Sicherheitswarnungen" },
      { name: "Agroscope",                            url: "https://www.agroscope.admin.ch", desc: "Agrarforschung, neue Sorten, Klimaresistenz" },
      { name: "Swiss Customs / TARES",                url: "https://www.gate.ezv.admin.ch", desc: "Einfuhr-/Ausfuhrdaten nach Warengruppe" },
    ],
  },
  {
    category: "Internationale Organisationen",
    items: [
      { name: "FAO FAOSTAT",          url: "https://www.fao.org/faostat", desc: "Globale Produktions- und Handelsdaten (REST API)" },
      { name: "WFP HungerMap",        url: "https://hungermap.wfp.org",   desc: "Globale Ernährungssicherheitsscores, IPC-Phasen" },
      { name: "World Bank Pink Sheet", url: "https://www.worldbank.org/en/research/commodity-markets", desc: "Monatliche Rohstoffpreise (Weizen, Kakao, Kaffee…)" },
      { name: "USDA FAS PSD Online",  url: "https://apps.fas.usda.gov/psdonline", desc: "Globale Angebot/Nachfrage-Bilanzen" },
      { name: "UN Comtrade",          url: "https://comtradeplus.un.org", desc: "Bilaterale Handelsströme (HS-Codes)" },
    ],
  },
  {
    category: "Wetter & Satellitendaten",
    items: [
      { name: "Open-Meteo",      url: "https://open-meteo.com", desc: "Kostenlose Wetterprognosen (kein API-Key erforderlich)" },
      { name: "Copernicus NDVI", url: "https://land.copernicus.eu", desc: "Satelliten-Vegetationsindex für Erntemonitoring" },
      { name: "CHIRPS Rainfall", url: "https://www.chc.ucsb.edu/data/chirps", desc: "Globale Niederschlagsdaten seit 1981" },
    ],
  },
  {
    category: "Nachrichten & Ereignisse",
    items: [
      { name: "GDELT Project",  url: "https://www.gdeltproject.org", desc: "Globale Ereignisdaten zu Krisen und Ernährung" },
      { name: "NewsAPI",        url: "https://newsapi.org",          desc: "Nachrichtenaggregation (100 req/day kostenlos)" },
      { name: "Agroscope RSS",  url: "https://www.agroscope.admin.ch/agroscope/de/home.rss.xml", desc: "Schweizer Agrarforschungs-News" },
    ],
  },
];

export default function Resources() {
  return (
    <>
      <Helmet>
        <title>Ressourcen – FoodSite Schweiz</title>
        <meta name="description" content="Datenquellen und APIs für die Schweizer Lebensmittelversorgungskettenüberwachung" />
      </Helmet>

      <div className="container py-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Datenquellen & APIs</h1>
          <p className="text-muted-foreground mt-1">
            Alle Datenquellen, die von FoodSite Schweiz genutzt werden — transparent und nachvollziehbar.
          </p>
        </div>

        {SOURCES.map((section) => (
          <section key={section.category} className="space-y-4">
            <h2 className="text-xl font-semibold">{section.category}</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {section.items.map((item) => (
                <Card key={item.name} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center justify-between gap-2">
                      <span>{item.name}</span>
                      <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        ))}

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Methodik</h2>
          <Card>
            <CardContent className="py-6 space-y-3 text-sm text-muted-foreground">
              <p>
                FoodSite Schweiz aggregiert Daten aus offiziellen Schweizer Bundesbehörden, internationalen Organisationen und Open-Data-APIs.
                Alle Daten werden in einer Supabase-Datenbank zwischengespeichert und stündlich aktualisiert.
              </p>
              <p>
                Fallback-Werte (BLW-Daten 2022) werden angezeigt, wenn Live-APIs nicht erreichbar sind.
                Datumsstempel geben immer den Stand der zuletzt abgerufenen Daten an.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <Badge variant="outline">Open Data</Badge>
                <Badge variant="outline">Kein API-Key für Kerndaten</Badge>
                <Badge variant="outline">Supabase Edge Functions</Badge>
                <Badge variant="outline">Stündliche Aktualisierung</Badge>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </>
  );
}
