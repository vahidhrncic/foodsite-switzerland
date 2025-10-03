import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface NewsItem {
  title: string;
  description: string;
  publishedAt: string;
  url: string;
  category: 'disease' | 'regulation' | 'disaster' | 'market';
  priority: 'high' | 'medium' | 'low';
  source: string;
}

// Swiss food and agriculture news sources
const NEWS_SOURCES = [
  {
    url: 'https://www.blv.admin.ch/blv/de/home.rss',
    name: 'BLV - Bundesamt für Lebensmittelsicherheit',
    category: 'regulation' as const,
  },
  {
    url: 'https://www.blw.admin.ch/blw/de/home.rss',
    name: 'BLW - Bundesamt für Landwirtschaft',
    category: 'market' as const,
  },
  {
    url: 'https://www.agroscope.admin.ch/agroscope/de/home.rss',
    name: 'Agroscope - Schweizer Kompetenzzentrum',
    category: 'market' as const,
  },
];

async function parseRSSFeed(url: string, source: string, category: string): Promise<NewsItem[]> {
  try {
    const response = await fetch(url);
    const text = await response.text();
    
    const items: NewsItem[] = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    const matches = text.matchAll(itemRegex);
    
    for (const match of matches) {
      const itemXml = match[1];
      
      const titleMatch = itemXml.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>|<title>(.*?)<\/title>/);
      const descriptionMatch = itemXml.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>|<description>(.*?)<\/description>/);
      const linkMatch = itemXml.match(/<link>(.*?)<\/link>/);
      const pubDateMatch = itemXml.match(/<pubDate>(.*?)<\/pubDate>/);
      
      if (titleMatch && linkMatch) {
        const title = titleMatch[1] || titleMatch[2];
        const description = descriptionMatch ? (descriptionMatch[1] || descriptionMatch[2]) : '';
        const link = linkMatch[1];
        const pubDate = pubDateMatch ? new Date(pubDateMatch[1]).toISOString() : new Date().toISOString();
        
        // Determine priority based on keywords
        let priority: 'high' | 'medium' | 'low' = 'medium';
        const lowercaseTitle = title.toLowerCase();
        const lowercaseDesc = description.toLowerCase();
        
        if (
          lowercaseTitle.includes('warnung') || 
          lowercaseTitle.includes('rückruf') ||
          lowercaseTitle.includes('gefahr') ||
          lowercaseDesc.includes('gesundheit')
        ) {
          priority = 'high';
        } else if (
          lowercaseTitle.includes('information') ||
          lowercaseTitle.includes('studie')
        ) {
          priority = 'low';
        }
        
        items.push({
          title: title.trim(),
          description: description.trim().substring(0, 200) + '...',
          publishedAt: pubDate,
          url: link.trim(),
          category: category as any,
          priority,
          source,
        });
      }
    }
    
    return items;
  } catch (error) {
    console.error(`Error fetching RSS feed from ${url}:`, error);
    return [];
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Fetching food news from Swiss sources...');
    
    // Fetch news from all sources in parallel
    const newsPromises = NEWS_SOURCES.map(source => 
      parseRSSFeed(source.url, source.name, source.category)
    );
    
    const newsArrays = await Promise.all(newsPromises);
    const allNews = newsArrays.flat();
    
    // Sort by date (newest first)
    allNews.sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
    
    // Limit to 20 most recent items
    const recentNews = allNews.slice(0, 20);
    
    console.log(`Successfully fetched ${recentNews.length} news items`);
    
    return new Response(
      JSON.stringify({ news: recentNews }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );
  } catch (error) {
    console.error('Error in fetch-food-news function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        news: [] 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
