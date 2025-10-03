import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Rss, ExternalLink, AlertTriangle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { supabase } from "@/integrations/supabase/client";

interface NewsItem {
  title: string;
  description: string;
  publishedAt: string;
  url: string;
  category: 'disease' | 'regulation' | 'disaster' | 'market';
  priority: 'high' | 'medium' | 'low';
  source: string;
}

const fetchNews = async (): Promise<NewsItem[]> => {
  try {
    const { data, error } = await supabase.functions.invoke('fetch-food-news');
    
    if (error) {
      console.error('Error fetching news:', error);
      return [];
    }
    
    return data?.news || [];
  } catch (error) {
    console.error('Error in fetchNews:', error);
    return [];
  }
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

const priorityIcons = {
  high: <AlertTriangle className="h-4 w-4 text-red-500" />,
  medium: <AlertTriangle className="h-4 w-4 text-yellow-500" />,
  low: null
};

export function NewsFeed() {
  const { data: news = [], isLoading, error } = useQuery({
    queryKey: ['food-news'],
    queryFn: fetchNews,
    refetchInterval: 300000, // Refresh every 5 minutes
    staleTime: 240000, // Consider data stale after 4 minutes
  });

  return (
    <Card className="lg:col-span-1">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Rss className="h-5 w-5" />
          Lebensmittel-Nachrichten
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {isLoading ? (
            <p className="text-muted-foreground">Nachrichten werden geladen...</p>
          ) : error ? (
            <p className="text-destructive">Fehler beim Laden der Nachrichten</p>
          ) : news.length === 0 ? (
            <p className="text-muted-foreground">Keine Nachrichten verfügbar</p>
          ) : (
            news.map((item, index) => (
              <div 
                key={index} 
                className="border-b last:border-0 pb-4 last:pb-0 hover:bg-gray-50 transition-colors p-3 rounded-lg"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <h3 className="font-semibold group">
                      <a 
                        href={item.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="hover:text-primary flex items-center gap-1"
                      >
                        {item.title}
                        <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    </h3>
                  </div>
                  {priorityIcons[item.priority]}
                </div>
                
                <div className="mt-2 flex flex-wrap gap-2">
                  <Badge variant="secondary" className={categoryColors[item.category]}>
                    {categoryLabels[item.category]}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {format(new Date(item.publishedAt), 'PPP', { locale: de })}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {item.source}
                  </Badge>
                </div>
                
                <p className="text-sm text-muted-foreground mt-2">
                  {item.description}
                </p>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}