export interface CrawledUrl {
  url: string;
  title?: string;
  lastmod: string;
}

export class SitemapCrawler {
  private visited = new Set<string>();
  private found: CrawledUrl[] = [];
  private maxPages: number;
  private maxDepth: number;
  private baseUrl: string;

  constructor(maxPages = 100, maxDepth = 3) {
    this.maxPages = maxPages;
    this.maxDepth = maxDepth;
    this.baseUrl = '';
  }

  async crawlWebsite(startUrl: string): Promise<{ success: boolean; data?: CrawledUrl[]; error?: string }> {
    try {
      this.baseUrl = new URL(startUrl).origin;
      this.visited.clear();
      this.found = [];

      await this.crawlPage(startUrl, 0);

      return {
        success: true,
        data: this.found
      };
    } catch (error) {
      console.error('Crawling error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to crawl website'
      };
    }
  }

  private async crawlPage(url: string, depth: number): Promise<void> {
    if (depth > this.maxDepth || this.found.length >= this.maxPages || this.visited.has(url)) {
      return;
    }

    try {
      const urlObj = new URL(url);
      // Only crawl same domain
      if (urlObj.origin !== this.baseUrl) {
        return;
      }

      this.visited.add(url);
      
      // Add current URL to sitemap
      this.found.push({
        url: url,
        lastmod: new Date().toISOString().split('T')[0]
      });

      // For demo purposes, we'll simulate finding links
      // In a real implementation, you'd fetch and parse the HTML
      if (depth < this.maxDepth && this.found.length < this.maxPages) {
        const commonPaths = [
          '/about',
          '/contact',
          '/services',
          '/blog',
          '/products',
          '/team',
          '/careers',
          '/privacy',
          '/terms'
        ];

        for (const path of commonPaths) {
          if (this.found.length >= this.maxPages) break;
          
          const newUrl = this.baseUrl + path;
          if (!this.visited.has(newUrl)) {
            await new Promise(resolve => setTimeout(resolve, 100)); // Simulate delay
            await this.crawlPage(newUrl, depth + 1);
          }
        }
      }
    } catch (error) {
      console.error(`Error crawling ${url}:`, error);
    }
  }
}