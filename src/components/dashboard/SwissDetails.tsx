import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";

export function SwissDetails() {
  const swissRegions = [
    {
      name: "Graubünden & Emmental",
      products: ["Alpkäse-Produktion", "Traditionelle Käseherstellung"],
      type: "Milchprodukte"
    },
    {
      name: "Mittelland, Waadt & Freiburg",
      products: ["Hauptanbaugebiet für Weizen", "Bedeutende Getreideflächen"],
      type: "Getreide"
    },
    {
      name: "St. Gallen, Luzern & Bern",
      products: ["Schweinezucht", "Geflügelproduktion", "Rinderhaltung"],
      type: "Fleisch"
    },
    {
      name: "Seeland, Wallis & Thurgau",
      products: ["Gemüseanbau", "Spezialkulturen", "Gewächshäuser"],
      type: "Gemüse"
    },
    {
      name: "Wallis, Thurgau & Waadt",
      products: ["Aprikosen", "Äpfel", "Diverse Obstkulturen"],
      type: "Früchte"
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
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {region.products.map((product) => (
                    <li key={product}>{product}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}