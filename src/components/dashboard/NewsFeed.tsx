import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Newspaper, AlertTriangle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";

interface NewsItem {
  title: string;
  description: string;
  publishedAt: string;
  url: string;
  category: 'disease' | 'regulation' | 'disaster' | 'market';
  priority: 'high' | 'medium' | 'low';
}

const fetchNews = async (): Promise<NewsItem[]> => {
  // Simulierte Nachrichtendaten - in einer realen Anwendung würde dies von einer News-API abgerufen
  return [
    {
      title: "Neue Richtlinien für Lebensmittelsicherheit in der Schweiz",
      description: "Das Bundesamt für Lebensmittelsicherheit und Veterinärwesen BLV hat neue Richtlinien veröffentlicht...",
      publishedAt: "2024-02-20",
      url: "https://www.blv.admin.ch/",
      category: "regulation",
      priority: "high"
    },
    {
      title: "Schweizer Milchproduktion erreicht Rekordhöhe",
      description: "Die Schweizer Milchbauern verzeichnen eine Rekordproduktion im letzten Quartal...",
      publishedAt: "2024-02-19",
      url: "https://www.swissmilk.ch/de/",
      category: "market",
      priority: "medium"
    },
    {
      title: "Getreidepreise: Aktuelle Entwicklungen",
      description: "Analyse der aktuellen Marktlage für Getreide in der Schweiz und Europa...",
      publishedAt: "2024-02-18",
      url: "https://www.fenaco.com/de",
      category: "market",
      priority: "medium"
    }
  ];
};

const categoryColors = {
  disease: "bg-red-100 text-red-800",
  regulation: "bg-blue-100 text-blue-800",
  disaster: "bg-orange-100 text-orange-800",
  market: "bg-green-100 text-green-800"
};

const categoryLabels = {
  disease: "Krankheit",
  regulation: "Regulierung",
  disaster: "Katastrophe",
  market: "Markt"
};

export function NewsFeed() {
  const { data: news = [], isLoading } = useQuery({
    queryKey: ['food-news'],
    queryFn: fetchNews,
  });

  return (
    <Card className="lg:col-span-1">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Newspaper className="h-5 w-5" />
          Lebensmittel-Nachrichten
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {isLoading ? (
            <p className="text-muted-foreground">Nachrichten werden geladen...</p>
          ) : (
            news.map((item, index) => (
              <div key={index} className="border-b last:border-0 pb-4 last:pb-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold hover:text-primary">
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {item.title}
                    </a>
                  </h3>
                  {item.priority === 'high' && (
                    <AlertTriangle className="h-4 w-4 text-red-500 flex-shrink-0" />
                  )}
                </div>
                <div className="mt-1 mb-2">
                  <Badge className={categoryColors[item.category]}>
                    {categoryLabels[item.category]}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{item.description}</p>
                <span className="text-xs text-muted-foreground mt-2 block">
                  {new Date(item.publishedAt).toLocaleDateString('de-CH')}
                </span>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}