import { Rss, ExternalLink, AlertTriangle, Clock } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { de } from "date-fns/locale";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

interface NewsItem {
  title: string;
  description: string;
  publishedAt: string;
  url: string;
  category: "disease" | "regulation" | "disaster" | "market";
  priority: "high" | "medium" | "low";
  source: string;
}

const fetchNews = async (): Promise<NewsItem[]> => {
  try {
    const { data, error } = await supabase.functions.invoke("fetch-food-news");
    if (error) { console.error("Error fetching news:", error); return []; }
    return data?.news ?? [];
  } catch { return []; }
};

const CATEGORY_META = {
  disease:    { emoji: "🦠", label: "Krankheit",   className: "bg-red-100   text-red-700   dark:bg-red-900/40   dark:text-red-300" },
  regulation: { emoji: "📋", label: "Regulierung", className: "bg-blue-100  text-blue-700  dark:bg-blue-900/40  dark:text-blue-300" },
  disaster:   { emoji: "⚠️",  label: "Katastrophe", className: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300" },
  market:     { emoji: "📈", label: "Markt",        className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300" },
} as const;

const PRIORITY_BORDER = {
  high:   "border-l-[3px] border-l-red-500",
  medium: "border-l-[3px] border-l-amber-400",
  low:    "border-l-[3px] border-l-transparent",
} as const;

export function NewsFeed() {
  const { data: news = [], isLoading, error } = useQuery({
    queryKey: ["food-news"],
    queryFn: fetchNews,
    refetchInterval: 300_000,
    staleTime: 240_000,
  });

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Rss className="h-4 w-4 text-primary" />
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Nachrichten
        </h2>
        {news.length > 0 && (
          <span className="ml-auto text-[11px] text-muted-foreground">{news.length} Artikel</span>
        )}
      </div>

      {/* Feed */}
      <div className="space-y-2 lg:max-h-[680px] lg:overflow-y-auto lg:pr-1 lg:scrollbar-thin">
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 rounded-lg bg-muted animate-pulse" />
            ))}
          </div>
        ) : error ? (
          <p className="text-sm text-destructive py-4 text-center">Fehler beim Laden der Nachrichten</p>
        ) : news.length === 0 ? (
          <p className="text-sm text-muted-foreground py-8 text-center">Keine Nachrichten verfügbar</p>
        ) : (
          news.map((item, index) => {
            const cat = CATEGORY_META[item.category];
            return (
              <a
                key={index}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "group flex flex-col gap-2 rounded-lg p-3 transition-all",
                  "hover:bg-muted/70 hover:shadow-sm",
                  PRIORITY_BORDER[item.priority],
                  item.priority === "high" && "bg-red-50/40 dark:bg-red-950/15",
                )}
              >
                {/* Title row */}
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-semibold leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </p>
                  <div className="flex items-center gap-1 shrink-0 mt-0.5">
                    {item.priority === "high" && <AlertTriangle className="h-3.5 w-3.5 text-red-500" />}
                    <ExternalLink className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                  {item.description}
                </p>

                {/* Meta row */}
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="secondary" className={cn("text-[10px] px-1.5 py-0 h-5 font-semibold", cat.className)}>
                    {cat.emoji} {cat.label}
                  </Badge>
                  <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <Clock className="h-2.5 w-2.5" />
                    {formatDistanceToNow(new Date(item.publishedAt), { addSuffix: true, locale: de })}
                  </span>
                  <span className="text-[10px] text-muted-foreground ml-auto truncate max-w-[100px]">{item.source}</span>
                </div>
              </a>
            );
          })
        )}
      </div>
    </div>
  );
}
