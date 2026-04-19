import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowUpIcon, ArrowDownIcon, ArrowRightIcon, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

type Trend = "up" | "down" | "stable";

interface Product { name: string; amount: string; productionTrend: Trend; consumptionTrend: Trend; }
interface Region {
  name: string; type: string; emoji: string;
  products: Product[];
  marketFactors: { trade: string[]; price: string[]; market: string[] };
  keyPlayers: { producers: string[]; suppliers: string[]; traders: string[] };
}

const swissRegions: Region[] = [
  {
    name: "Graubünden & Emmental", type: "Milchprodukte", emoji: "🧀",
    products: [
      { name: "Alpkäse-Produktion",          amount: "15'000 t/Jahr", productionTrend: "up",     consumptionTrend: "stable" },
      { name: "Traditionelle Käseherstellung",amount: "25'000 t/Jahr", productionTrend: "up",     consumptionTrend: "up" },
    ],
    marketFactors: { trade: ["Export nach EU", "Hohe Nachfrage in Asien"], price: ["Weltmarktpreise", "Qualitätszuschläge"], market: ["Stabile Nachfrage", "Premium-Segment"] },
    keyPlayers: { producers: ["Emmi AG", "Cremo SA"], suppliers: ["SMP", "Aaremilch AG"], traders: ["Fromarte", "Switzerland Cheese Marketing"] },
  },
  {
    name: "Mittelland, Waadt & Freiburg", type: "Getreide", emoji: "🌾",
    products: [
      { name: "Weizenanbau",           amount: "300'000 t/Jahr", productionTrend: "stable", consumptionTrend: "up" },
      { name: "Getreideflächen",        amount: "180'000 t/Jahr", productionTrend: "down",   consumptionTrend: "stable" },
    ],
    marketFactors: { trade: ["Import aus EU und Kanada", "Regionale Verteilung"], price: ["Internationale Preise", "Transportkosten"], market: ["Brotgetreide", "Futtermittelmarkt"] },
    keyPlayers: { producers: ["Swissmill", "Groupe Minoteries SA"], suppliers: ["fenaco", "IP-SUISSE"], traders: ["Coop", "Migros"] },
  },
  {
    name: "St. Gallen, Luzern & Bern", type: "Fleisch", emoji: "🥩",
    products: [
      { name: "Schweinezucht",    amount: "250'000 t/Jahr", productionTrend: "down",   consumptionTrend: "down" },
      { name: "Geflügelproduktion",amount: "100'000 t/Jahr", productionTrend: "up",     consumptionTrend: "up" },
      { name: "Rinderhaltung",    amount: "135'000 t/Jahr", productionTrend: "stable", consumptionTrend: "down" },
    ],
    marketFactors: { trade: ["Lokaler Konsum", "EU-Export"], price: ["Futterkosten", "Qualitätsstandards"], market: ["Bio-Trend", "Regionalität"] },
    keyPlayers: { producers: ["Bell Food Group", "Micarna SA"], suppliers: ["UFA AG", "ANICOM AG"], traders: ["Proviande", "Swiss Meat"] },
  },
  {
    name: "Seeland, Wallis & Thurgau", type: "Gemüse", emoji: "🥦",
    products: [
      { name: "Gemüseanbau",   amount: "320'000 t/Jahr", productionTrend: "up",     consumptionTrend: "up" },
      { name: "Spezialkulturen",amount: "45'000 t/Jahr",  productionTrend: "stable", consumptionTrend: "up" },
      { name: "Gewächshäuser", amount: "80'000 t/Jahr",  productionTrend: "up",     consumptionTrend: "stable" },
    ],
    marketFactors: { trade: ["Saisonaler Import", "EU-Handel"], price: ["Wetterbedingungen", "Saisonalität"], market: ["Frischmarkt", "Verarbeitungsindustrie"] },
    keyPlayers: { producers: ["Fenaco", "Eisberg"], suppliers: ["Gemüseproduzenten-Vereinigung", "SwissGAP"], traders: ["SGPV-FSPC", "Union maraîchère suisse"] },
  },
  {
    name: "Wallis, Thurgau & Waadt", type: "Früchte", emoji: "🍎",
    products: [
      { name: "Aprikosen",        amount: "4'500 t/Jahr",   productionTrend: "stable", consumptionTrend: "up" },
      { name: "Äpfel",            amount: "125'000 t/Jahr", productionTrend: "down",   consumptionTrend: "stable" },
      { name: "Diverse Obstkulturen",amount: "90'000 t/Jahr",  productionTrend: "stable", consumptionTrend: "up" },
    ],
    marketFactors: { trade: ["Regionale Vermarktung", "Saisonaler Import"], price: ["Ernteertrag", "Qualitätsklassen"], market: ["Direktvermarktung", "Großhandel"] },
    keyPlayers: { producers: ["Fruit-Union Suisse", "TOPfruits"], suppliers: ["SwissGAP", "Bio Suisse"], traders: ["Migros", "Coop"] },
  },
];

const TrendIcon = ({ trend }: { trend: Trend }) => {
  if (trend === "up")     return <ArrowUpIcon   className="h-3 w-3 text-forest-600 dark:text-forest-400 shrink-0" />;
  if (trend === "down")   return <ArrowDownIcon className="h-3 w-3 text-swiss-600  dark:text-swiss-400  shrink-0" />;
  return                         <ArrowRightIcon className="h-3 w-3 text-blue-500 shrink-0" />;
};

function Chips({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-1 mt-1">
      {items.map((item) => (
        <span key={item} className="inline-flex rounded-md bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground border border-border/60">
          {item}
        </span>
      ))}
    </div>
  );
}

function RegionCard({ region }: { region: Region }) {
  return (
    <div className="rounded-xl bg-card ring-1 ring-border/60 overflow-hidden shadow-sm h-full">
      {/* Header */}
      <div className="px-4 pt-4 pb-3 border-b border-border/40 bg-muted/30">
        <div className="flex items-center gap-2.5">
          <span className="text-2xl">{region.emoji}</span>
          <div>
            <p className="text-base font-bold">{region.type}</p>
            <p className="text-[11px] text-muted-foreground">{region.name}</p>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="px-4 py-3 space-y-2.5">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Produkte</p>
        {region.products.map((p) => (
          <div key={p.name} className="flex items-center justify-between gap-2">
            <div className="min-w-0">
              <p className="text-xs font-medium truncate">{p.name}</p>
              <p className="text-[10px] text-muted-foreground">{p.amount}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <div className="flex items-center gap-0.5" title="Produktion">
                <span className="text-[8px] text-muted-foreground">P</span>
                <TrendIcon trend={p.productionTrend} />
              </div>
              <div className="flex items-center gap-0.5" title="Verbrauch">
                <span className="text-[8px] text-muted-foreground">V</span>
                <TrendIcon trend={p.consumptionTrend} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Market factors */}
      <div className="px-4 pb-4 space-y-2">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Marktfaktoren</p>
        <div className="space-y-1.5">
          <div><span className="text-[10px] font-medium text-muted-foreground">Handel</span><Chips items={region.marketFactors.trade} /></div>
          <div><span className="text-[10px] font-medium text-muted-foreground">Preis</span><Chips items={region.marketFactors.price} /></div>
        </div>
      </div>

      {/* Key players */}
      <div className="px-4 pb-4 border-t border-border/40 pt-3 space-y-1.5">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Akteure</p>
        <Chips items={[...region.keyPlayers.producers, ...region.keyPlayers.traders]} />
      </div>
    </div>
  );
}

export function SwissDetails() {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="h-4 w-4 text-primary" />
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Schweizer Lebensmittelproduktion
        </h2>
      </div>

      {/* Mobile: accordion */}
      <div className="lg:hidden">
        <Accordion type="single" collapsible className="space-y-2">
          {swissRegions.map((region) => (
            <AccordionItem key={region.name} value={region.name} className="rounded-xl ring-1 ring-border/60 bg-card overflow-hidden border-none px-4">
              <AccordionTrigger className="py-3 hover:no-underline">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{region.emoji}</span>
                  <div className="text-left">
                    <p className="text-sm font-semibold">{region.type}</p>
                    <p className="text-[11px] text-muted-foreground">{region.name}</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-4 space-y-3">
                {region.products.map((p) => (
                  <div key={p.name} className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium">{p.name}</p>
                      <p className="text-[10px] text-muted-foreground">{p.amount}</p>
                    </div>
                    <div className={cn("flex items-center gap-1 text-[10px] font-medium",
                      p.productionTrend === "up" ? "text-forest-600 dark:text-forest-400" :
                      p.productionTrend === "down" ? "text-swiss-600 dark:text-swiss-400" : "text-muted-foreground"
                    )}>
                      <TrendIcon trend={p.productionTrend} />
                      {p.productionTrend === "up" ? "steigend" : p.productionTrend === "down" ? "sinkend" : "stabil"}
                    </div>
                  </div>
                ))}
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">Akteure</p>
                  <Chips items={[...region.keyPlayers.producers, ...region.keyPlayers.traders]} />
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* Desktop: grid */}
      <div className="hidden lg:grid grid-cols-2 xl:grid-cols-3 gap-4">
        {swissRegions.map((region) => (
          <RegionCard key={region.name} region={region} />
        ))}
      </div>
    </div>
  );
}
