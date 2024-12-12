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
  // Simulated news data - in a real application, this would fetch from a news API
  return [
    {
      title: "Salmonella Outbreak Affects Major Wheat Suppliers",
      description: "Health authorities report contamination in wheat supplies from key producing regions...",
      publishedAt: "2024-02-20",
      url: "https://www.foodsafetynews.com/",
      category: "disease",
      priority: "high"
    },
    {
      title: "New Import Regulations for EU Food Markets",
      description: "European Union announces stricter requirements for food imports starting next quarter...",
      publishedAt: "2024-02-19",
      url: "https://ec.europa.eu/food/safety_en",
      category: "regulation",
      priority: "medium"
    },
    {
      title: "Drought Conditions Affect South American Crops",
      description: "Severe weather patterns impact agricultural production in key growing regions...",
      publishedAt: "2024-02-18",
      url: "https://www.fao.org/news/en/",
      category: "disaster",
      priority: "high"
    }
  ];
};

const categoryColors = {
  disease: "bg-red-100 text-red-800",
  regulation: "bg-blue-100 text-blue-800",
  disaster: "bg-orange-100 text-orange-800",
  market: "bg-green-100 text-green-800"
};

export function NewsFeed() {
  const { data: news = [], isLoading } = useQuery({
    queryKey: ['food-news'],
    queryFn: fetchNews,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Newspaper className="h-5 w-5" />
          Food Industry Alerts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {isLoading ? (
            <p className="text-muted-foreground">Loading news...</p>
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
                    {item.category}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{item.description}</p>
                <span className="text-xs text-muted-foreground mt-2 block">
                  {new Date(item.publishedAt).toLocaleDateString()}
                </span>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}