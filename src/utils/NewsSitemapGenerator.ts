export interface NewsData {
  url: string;
  title: string;
  publicationDate: string;
  publicationName: string;
  language: string;
  keywords?: string[];
  genres?: string[];
}

export class NewsSitemapGenerator {
  static extractNewsFromUrls(urls: string[]): NewsData[] {
    // Simulate extracting news articles from crawled URLs
    const mockNews: NewsData[] = [];
    
    urls.forEach((url, index) => {
      // Mock news extraction logic - only some pages are news articles
      if (url.includes('news') || url.includes('blog') || url.includes('article') || Math.random() > 0.8) {
        const domain = new URL(url).hostname;
        mockNews.push({
          url: url,
          title: `News Article ${index + 1} from ${domain}`,
          publicationDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(), // Random date within last 30 days
          publicationName: domain.replace('www.', '').split('.')[0].toUpperCase() + ' News',
          language: 'en',
          keywords: ['technology', 'web', 'sitemap', 'seo'],
          genres: ['Blog', 'Technology']
        });
      }
    });
    
    return mockNews.slice(0, 20); // Limit to 20 news articles for demo
  }

  static generateNewsSitemapXML(news: NewsData[]): string {
    if (news.length === 0) {
      return '';
    }

    const urlEntries = news.map(article => `
  <url>
    <loc>${article.url}</loc>
    <news:news>
      <news:publication>
        <news:name>${article.publicationName}</news:name>
        <news:language>${article.language}</news:language>
      </news:publication>
      <news:publication_date>${article.publicationDate}</news:publication_date>
      <news:title>${article.title}</news:title>
      ${article.keywords ? `<news:keywords>${article.keywords.join(', ')}</news:keywords>` : ''}
      ${article.genres ? `<news:genres>${article.genres.join(', ')}</news:genres>` : ''}
    </news:news>
  </url>`).join('');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">${urlEntries}
</urlset>`;
  }

  static downloadNewsSitemap(xml: string, domain: string): void {
    if (xml) {
      const blob = new Blob([xml], { type: 'application/xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${domain}-news-sitemap.xml`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  }
}