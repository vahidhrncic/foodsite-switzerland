import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Newspaper, AlertTriangle } from "lucide-react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import Parser from 'rss-parser';
import { useEffect, useRef } from "react";

interface NewsItem {
  title: string;
  description: string;
  publishedAt: string;
  url: string;
  category: 'disease' | 'regulation' | 'disaster' | 'market';
  priority: 'high' | 'medium' | 'low';
}

const RSS_FEEDS = [
  'https://www.blw.admin.ch/blw/de/home/services/rss.xml',
  'https://www.blv.admin.ch/blv/de/home/services/rss.xml',
  'https://www.swissmilk.ch/de/rss/',
];

const parser = new Parser();

const fetchNews = async ({ pageParam = 0 }): Promise<NewsItem[]> => {
  try {
    // Fetch RSS feeds
    const feedPromises = RSS_FEEDS.map(async (url) => {
      try {
        const feed = await parser.parseURL(url);
        return feed.items.map(item => ({
          title: item.title || '',
          description: item.contentSnippet || item.content || '',
          publishedAt: item.pubDate || new Date().toISOString(),
          url: item.link || '',
          // Categorize based on content analysis
          category: determineCategory(item.title || '', item.contentSnippet || ''),
          priority: determinePriority(item.title || '', item.contentSnippet || '')
        }));
      } catch (error) {
        console.error(`Error fetching RSS feed from ${url}:`, error);
        return [];
      }
    });

    const allItems = await Promise.all(feedPromises);
    const flattenedItems = allItems.flat();
    
    // Sort by date and paginate
    const sortedItems = flattenedItems.sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

    const itemsPerPage = 10;
    const start = pageParam * itemsPerPage;
    return sortedItems.slice(start, start + itemsPerPage);
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
};

const determineCategory = (title: string, content: string): NewsItem['category'] => {
  const text = (title + content).toLowerCase();
  if (text.includes('krankheit') || text.includes('pest') || text.includes('virus')) return 'disease';
  if (text.includes('gesetz') || text.includes('verordnung') || text.includes('regulierung')) return 'regulation';
  if (text.includes('unwetter') || text.includes('dürre') || text.includes('katastrophe')) return 'disaster';
  return 'market';
};

const determinePriority = (title: string, content: string): NewsItem['priority'] => {
  const text = (title + content).toLowerCase();
  if (text.includes('dringend') || text.includes('warnung') || text.includes('sofort')) return 'high';
  if (text.includes('wichtig') || text.includes('beachten')) return 'medium';
  return 'low';
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
  const scrollRef = useRef<HTMLDivElement>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['food-news'],
    queryFn: fetchNews,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 0 ? undefined : allPages.length;
    },
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.5 }
    );

    if (scrollRef.current) {
      observer.observe(scrollRef.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const allNews = data?.pages.flat() || [];

  return (
    <Card className="lg:col-span-1">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Newspaper className="h-5 w-5" />
          Lebensmittel-Nachrichten
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-[600px] overflow-y-auto">
          {isLoading ? (
            <p className="text-muted-foreground">Nachrichten werden geladen...</p>
          ) : (
            <>
              {allNews.map((item, index) => (
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
              ))}
              <div ref={scrollRef} className="h-4" />
              {isFetchingNextPage && (
                <p className="text-center text-muted-foreground">Lade weitere Nachrichten...</p>
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}