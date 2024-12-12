import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, TrendingUp, Users, Building2, ArrowUpIcon, ArrowDownIcon, ArrowRightIcon } from "lucide-react";

export function SwissDetails() {
  const swissRegions = [
    {
      name: "Graubünden & Emmental",
      products: [
        {
          name: "Alpkäse-Produktion",
          amount: "15'000 Tonnen/Jahr",
          productionTrend: "up",
          consumptionTrend: "stable"
        },
        {
          name: "Traditionelle Käseherstellung",
          amount: "25'000 Tonnen/Jahr",
          productionTrend: "up",
          consumptionTrend: "up"
        }
      ],
      type: "Milchprodukte",
      marketFactors: {
        trade: ["Export nach EU", "Hohe Nachfrage in Asien"],
        price: ["Weltmarktpreise", "Qualitätszuschläge"],
        market: ["Stabile Nachfrage", "Premium-Segment"]
      },
      keyPlayers: {
        producers: ["Emmi AG", "Cremo SA"],
        suppliers: ["Schweizer Milchproduzenten SMP", "Aaremilch AG"],
        traders: ["Fromarte", "Switzerland Cheese Marketing AG"]
      }
    },
    {
      name: "Mittelland, Waadt & Freiburg",
      products: [
        {
          name: "Hauptanbaugebiet für Weizen",
          amount: "300'000 Tonnen/Jahr",
          productionTrend: "stable",
          consumptionTrend: "up"
        },
        {
          name: "Bedeutende Getreideflächen",
          amount: "180'000 Tonnen/Jahr",
          productionTrend: "down",
          consumptionTrend: "stable"
        }
      ],
      type: "Getreide",
      marketFactors: {
        trade: ["Import aus EU und Kanada", "Regionale Verteilung"],
        price: ["Internationale Getreidepreise", "Transportkosten"],
        market: ["Brotgetreide-Nachfrage", "Futtermittelmarkt"]
      },
      keyPlayers: {
        producers: ["Swissmill", "Groupe Minoteries SA"],
        suppliers: ["fenaco Genossenschaft", "IP-SUISSE"],
        traders: ["Coop", "Migros"]
      }
    },
    {
      name: "St. Gallen, Luzern & Bern",
      products: [
        {
          name: "Schweinezucht",
          amount: "250'000 Tonnen/Jahr",
          productionTrend: "down",
          consumptionTrend: "down"
        },
        {
          name: "Geflügelproduktion",
          amount: "100'000 Tonnen/Jahr",
          productionTrend: "up",
          consumptionTrend: "up"
        },
        {
          name: "Rinderhaltung",
          amount: "135'000 Tonnen/Jahr",
          productionTrend: "stable",
          consumptionTrend: "down"
        }
      ],
      type: "Fleisch",
      marketFactors: {
        trade: ["Lokaler Konsum", "EU-Export"],
        price: ["Futterkosten", "Qualitätsstandards"],
        market: ["Bio-Trend", "Regionalität"]
      },
      keyPlayers: {
        producers: ["Bell Food Group", "Micarna SA"],
        suppliers: ["UFA AG", "ANICOM AG"],
        traders: ["Proviande", "Swiss Meat"]
      }
    },
    {
      name: "Seeland, Wallis & Thurgau",
      products: [
        {
          name: "Gemüseanbau",
          amount: "320'000 Tonnen/Jahr",
          productionTrend: "up",
          consumptionTrend: "up"
        },
        {
          name: "Spezialkulturen",
          amount: "45'000 Tonnen/Jahr",
          productionTrend: "stable",
          consumptionTrend: "up"
        },
        {
          name: "Gewächshäuser",
          amount: "80'000 Tonnen/Jahr",
          productionTrend: "up",
          consumptionTrend: "stable"
        }
      ],
      type: "Gemüse",
      marketFactors: {
        trade: ["Saisonaler Import", "EU-Handel"],
        price: ["Wetterbedingungen", "Saisonalität"],
        market: ["Frischmarkt", "Verarbeitungsindustrie"]
      },
      keyPlayers: {
        producers: ["Fenaco Landesprodukte", "Eisberg"],
        suppliers: ["Gemüseproduzenten-Vereinigung", "SwissGAP"],
        traders: ["SGPV-FSPC", "Union maraîchère suisse"]
      }
    },
    {
      name: "Wallis, Thurgau & Waadt",
      products: [
        {
          name: "Aprikosen",
          amount: "4'500 Tonnen/Jahr",
          productionTrend: "stable",
          consumptionTrend: "up"
        },
        {
          name: "Äpfel",
          amount: "125'000 Tonnen/Jahr",
          productionTrend: "down",
          consumptionTrend: "stable"
        },
        {
          name: "Diverse Obstkulturen",
          amount: "90'000 Tonnen/Jahr",
          productionTrend: "stable",
          consumptionTrend: "up"
        }
      ],
      type: "Früchte",
      marketFactors: {
        trade: ["Regionale Vermarktung", "Saisonaler Import"],
        price: ["Ernteertrag", "Qualitätsklassen"],
        market: ["Direktvermarktung", "Großhandel"]
      },
      keyPlayers: {
        producers: ["Fruit-Union Suisse", "TOPfruits"],
        suppliers: ["SwissGAP", "Bio Suisse"],
        traders: ["Migros", "Coop"]
      }
    }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <ArrowUpIcon className="h-4 w-4 text-green-600" />;
      case 'down':
        return <ArrowDownIcon className="h-4 w-4 text-red-600" />;
      case 'stable':
        return <ArrowRightIcon className="h-4 w-4 text-blue-600" />;
      default:
        return null;
    }
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Schweizer Lebensmittelproduktion
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {swissRegions.map((region) => (
            <Card key={region.name} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">{region.type}</CardTitle>
              </CardHeader>
              <CardContent>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">
                  {region.name}
                </h4>
                <div className="space-y-4">
                  <div>
                    <h5 className="text-sm font-medium mb-1">Produkte</h5>
                    <ul className="space-y-2">
                      {region.products.map((product) => (
                        <li key={product.name} className="text-sm">
                          <div className="flex items-center justify-between">
                            <span>{product.name} ({product.amount})</span>
                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-1" title="Produktionstrend">
                                <TrendingUp className="h-3 w-3 text-gray-500" />
                                {getTrendIcon(product.productionTrend)}
                              </div>
                              <div className="flex items-center gap-1" title="Verbrauchstrend">
                                <Users className="h-3 w-3 text-gray-500" />
                                {getTrendIcon(product.consumptionTrend)}
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="text-sm font-medium mb-1 flex items-center gap-1">
                      <TrendingUp className="h-4 w-4" /> Marktfaktoren
                    </h5>
                    <div className="text-sm space-y-2">
                      <p><strong>Handel:</strong> {region.marketFactors.trade.join(", ")}</p>
                      <p><strong>Preis:</strong> {region.marketFactors.price.join(", ")}</p>
                      <p><strong>Markt:</strong> {region.marketFactors.market.join(", ")}</p>
                    </div>
                  </div>

                  <div>
                    <h5 className="text-sm font-medium mb-1 flex items-center gap-1">
                      <Users className="h-4 w-4" /> Hauptakteure
                    </h5>
                    <div className="text-sm space-y-2">
                      <p><strong>Produzenten:</strong> {region.keyPlayers.producers.join(", ")}</p>
                      <p><strong>Lieferanten:</strong> {region.keyPlayers.suppliers.join(", ")}</p>
                      <p><strong>Händler:</strong> {region.keyPlayers.traders.join(", ")}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}