export interface RSSItem {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  guid: string;
}

export class RSSFeedGenerator {
  static generateRSSFromUrls(urls: string[], siteUrl: string): RSSItem[] {
    // Simulate generating RSS items from crawled URLs
    const mockItems: RSSItem[] = [];
    
    // Filter for content that would typically be in RSS feeds
    const contentUrls = urls.filter(url => 
      url.includes('blog') || 
      url.includes('news') || 
      url.includes('article') || 
      url.includes('post')
    );
    
    if (contentUrls.length === 0) {
      // Use some random URLs if no obvious content pages
      contentUrls.push(...urls.slice(0, 10));
    }
    
    contentUrls.forEach((url, index) => {
      const domain = new URL(siteUrl).hostname;
      mockItems.push({
        title: `Article ${index + 1} from ${domain}`,
        link: url,
        description: `This is a sample description for content found at ${url}. This would typically contain a summary of the actual content.`,
        pubDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toUTCString(), // Random date within last 30 days
        guid: url
      });
    });
    
    return mockItems.slice(0, 15); // Limit to 15 items for demo
  }

  static generateRSSXML(items: RSSItem[], siteUrl: string): string {
    if (items.length === 0) {
      return '';
    }

    const domain = new URL(siteUrl).hostname;
    const itemEntries = items.map(item => `
    <item>
      <title><![CDATA[${item.title}]]></title>
      <link>${item.link}</link>
      <description><![CDATA[${item.description}]]></description>
      <pubDate>${item.pubDate}</pubDate>
      <guid isPermaLink="true">${item.guid}</guid>
    </item>`).join('');

    return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${domain} RSS Feed</title>
    <link>${siteUrl}</link>
    <description>Latest content from ${domain}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />${itemEntries}
  </channel>
</rss>`;
  }

  static downloadRSSFeed(xml: string, domain: string): void {
    if (xml) {
      const blob = new Blob([xml], { type: 'application/xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${domain}-rss-feed.xml`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  }
}