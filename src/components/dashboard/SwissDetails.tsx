import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, TrendingUp, Users, Building2 } from "lucide-react";

export function SwissDetails() {
  const swissRegions = [
    {
      name: "Graubünden & Emmental",
      products: ["Alpkäse-Produktion", "Traditionelle Käseherstellung"],
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
      products: ["Hauptanbaugebiet für Weizen", "Bedeutende Getreideflächen"],
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
      products: ["Schweinezucht", "Geflügelproduktion", "Rinderhaltung"],
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
      products: ["Gemüseanbau", "Spezialkulturen", "Gewächshäuser"],
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
      products: ["Aprikosen", "Äpfel", "Diverse Obstkulturen"],
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
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {region.products.map((product) => (
                        <li key={product}>{product}</li>
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