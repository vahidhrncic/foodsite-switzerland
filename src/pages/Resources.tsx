import { Helmet } from "react-helmet-async";
import { ExternalLink, Database } from "lucide-react";
import { cn } from "@/lib/utils";

const SOURCES = [
  {
    category: "🇨🇭 Schweizer Behörden",
    color: "border-l-4 border-l-forest-500",
    items: [
      { name: "BLW",        full: "Bundesamt für Landwirtschaft",   url: "https://www.blw.admin.ch",         desc: "Agrarpolitik, Marktbeobachtung, Statistiken" },
      { name: "BFS",        full: "Bundesamt für Statistik",         url: "https://www.bfs.admin.ch",         desc: "Nahrungsmittelpreisindizes, Konsumstatistiken" },
      { name: "BLV",        full: "Bundesamt für Lebensmittelsicherheit", url: "https://www.blv.admin.ch",    desc: "Lebensmittelrückrufe, Sicherheitswarnungen" },
      { name: "Agroscope",  full: "Agrar- und Nahrungsmittelforschung", url: "https://www.agroscope.admin.ch", desc: "Sorten, Klimaresistenz, Schädlingsmonitoring" },
      { name: "EZV",        full: "Swiss Customs / TARES",           url: "https://www.gate.ezv.admin.ch",    desc: "Einfuhr-/Ausfuhrdaten nach Warengruppe" },
    ],
  },
  {
    category: "🌍 Internationale Organisationen",
    color: "border-l-4 border-l-blue-500",
    items: [
      { name: "FAO",        full: "FAOSTAT – Food and Agriculture Organization", url: "https://www.fao.org/faostat", desc: "Globale Produktions- und Handelsdaten (freie REST API)" },
      { name: "WFP",        full: "HungerMap – World Food Programme",            url: "https://hungermap.wfp.org",   desc: "Globale Ernährungssicherheit, IPC-Phasen" },
      { name: "World Bank", full: "Pink Sheet Commodity Prices",                  url: "https://www.worldbank.org",   desc: "Monatliche Rohstoffpreise: Weizen, Kakao, Kaffee…" },
      { name: "USDA FAS",   full: "Production, Supply and Distribution",         url: "https://apps.fas.usda.gov",   desc: "Globale Angebot/Nachfrage-Bilanzen" },
      { name: "Comtrade",   full: "UN Comtrade – Bilateral Trade",               url: "https://comtradeplus.un.org", desc: "Bilaterale Handelsströme (HS-Codes), 100 req/day gratis" },
    ],
  },
  {
    category: "🌦 Wetter & Satelliten",
    color: "border-l-4 border-l-amber-500",
    items: [
      { name: "Open-Meteo", full: "Open-Meteo Weather API",     url: "https://open-meteo.com",              desc: "Kostenlos, kein API-Key, stündliche Prognosen" },
      { name: "Copernicus", full: "NDVI – Vegetationsindex",    url: "https://land.copernicus.eu",          desc: "Satelliten-Vegetationsindex für Erntemonitoring" },
      { name: "CHIRPS",     full: "Climate Hazards Group CHIRPS",url: "https://www.chc.ucsb.edu/data/chirps",desc: "Globale Niederschlagsdaten seit 1981" },
    ],
  },
  {
    category: "📰 Nachrichten & Ereignisse",
    color: "border-l-4 border-l-swiss-500",
    items: [
      { name: "GDELT",      full: "GDELT Project",  url: "https://www.gdeltproject.org",         desc: "Globale Ereignisdaten zu Krisen und Ernährung" },
      { name: "NewsAPI",    full: "NewsAPI.org",     url: "https://newsapi.org",                  desc: "Nachrichtenaggregation, 100 req/day gratis" },
      { name: "RSS Feeds",  full: "Agroscope / BLV", url: "https://www.agroscope.admin.ch",      desc: "Schweizer Agrarforschungs- und Sicherheitsnews" },
    ],
  },
];

function Monogram({ name }: { name: string }) {
  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted text-sm font-bold text-foreground border border-border/60">
      {name.slice(0, 2).toUpperCase()}
    </div>
  );
}

export default function Resources() {
  return (
    <>
      <Helmet>
        <title>Ressourcen – FoodSite Schweiz</title>
        <meta name="description" content="Datenquellen und APIs für die Schweizer Lebensmittelversorgungskettenüberwachung" />
      </Helmet>

      {/* Hero */}
      <div className="page-hero border-b">
        <div className="container py-8">
          <div className="flex items-start gap-4 animate-fade-up">
            <div className="hidden sm:flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Database className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Datenquellen & APIs</h1>
              <p className="text-muted-foreground mt-1 text-sm">
                Alle Quellen, die FoodSite Schweiz nutzt — transparent und nachvollziehbar.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-6 space-y-10">
        {SOURCES.map((section) => (
          <section key={section.category} className="space-y-4">
            <h2 className="text-sm font-bold">{section.category}</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {section.items.map((item) => (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "group flex items-start gap-3 rounded-xl bg-card p-4 shadow-sm",
                    "ring-1 ring-border/60 transition-all hover:shadow-card-hover hover:ring-border",
                    section.color,
                  )}
                >
                  <Monogram name={item.name} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-semibold">{item.name}</p>
                      <ExternalLink className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                    </div>
                    <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed line-clamp-2">{item.desc}</p>
                  </div>
                </a>
              ))}
            </div>
          </section>
        ))}

        {/* Methodology */}
        <section className="rounded-xl bg-muted/50 border border-border/60 p-6 space-y-3">
          <h2 className="text-sm font-bold">Methodik</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            FoodSite Schweiz aggregiert öffentliche Daten via Supabase Edge Functions, die stündlich laufen.
            Alle Quellen sind frei zugänglich — kein API-Key für Kerndaten nötig.
            Fallback-Werte (BLW 2022) greifen bei Netzwerkausfällen.
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            {["Open Data", "Kein API-Key", "Stündlich aktualisiert", "Supabase Edge Functions", "Fallback-Daten"].map((tag) => (
              <span key={tag} className="inline-flex rounded-full bg-background border border-border px-3 py-1 text-[11px] font-medium text-muted-foreground">
                {tag}
              </span>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
