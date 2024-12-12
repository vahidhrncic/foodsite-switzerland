import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Newspaper } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface NewsItem {
  title: string;
  description: string;
  publishedAt: string;
  url: string;
}

const fetchNews = async (): Promise<NewsItem[]> => {
  // Simulated news data - in a real application, this would fetch from a news API
  return [
    {
      title: "Global Food Prices Continue to Rise",
      description: "Market analysis shows increasing pressure on global food supply chains...",
      publishedAt: "2024-02-20",
      url: "#"
    },
    {
      title: "Sustainable Agriculture Trends",
      description: "New technologies in sustainable farming are reshaping the industry...",
      publishedAt: "2024-02-19",
      url: "#"
    },
    {
      title: "Supply Chain Innovation",
      description: "Digital transformation in food supply chains leads to improved efficiency...",
      publishedAt: "2024-02-18",
      url: "#"
    }
  ];
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
          Food Industry News
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {isLoading ? (
            <p className="text-muted-foreground">Loading news...</p>
          ) : (
            news.map((item, index) => (
              <div key={index} className="border-b last:border-0 pb-4 last:pb-0">
                <h3 className="font-semibold hover:text-primary">
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    {item.title}
                  </a>
                </h3>
                <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
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