export interface SitemapUrl {
  url: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export class SitemapGenerator {
  static generateXML(urls: SitemapUrl[]): string {
    const xmlDeclaration = '<?xml version="1.0" encoding="UTF-8"?>';
    const urlsetOpen = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
    const urlsetClose = '</urlset>';
    
    const urlEntries = urls.map(urlData => {
      let urlEntry = `  <url>\n    <loc>${this.escapeXml(urlData.url)}</loc>`;
      
      if (urlData.lastmod) {
        urlEntry += `\n    <lastmod>${urlData.lastmod}</lastmod>`;
      }
      
      if (urlData.changefreq) {
        urlEntry += `\n    <changefreq>${urlData.changefreq}</changefreq>`;
      }
      
      if (urlData.priority !== undefined) {
        urlEntry += `\n    <priority>${urlData.priority}</priority>`;
      }
      
      urlEntry += '\n  </url>';
      return urlEntry;
    }).join('\n');
    
    return `${xmlDeclaration}\n${urlsetOpen}\n${urlEntries}\n${urlsetClose}`;
  }

  static generateHTML(urls: SitemapUrl[], siteUrl: string): string {
    const siteName = new URL(siteUrl).hostname;
    
    const htmlHeader = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sitemap for ${siteName}</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
        h1 { color: #333; border-bottom: 2px solid #0ea5e9; padding-bottom: 10px; }
        .url-item { margin: 15px 0; padding: 15px; background: #f8fafc; border-left: 4px solid #0ea5e9; }
        .url-link { color: #0ea5e9; text-decoration: none; font-weight: bold; }
        .url-link:hover { text-decoration: underline; }
        .url-meta { color: #666; font-size: 0.9em; margin-top: 5px; }
        .stats { background: #e0f2fe; padding: 20px; border-radius: 8px; margin-bottom: 30px; }
    </style>
</head>
<body>
    <h1>Sitemap for ${siteName}</h1>
    <div class="stats">
        <strong>Total URLs:</strong> ${urls.length}<br>
        <strong>Generated:</strong> ${new Date().toLocaleString()}
    </div>`;

    const urlList = urls.map(urlData => {
      let metaInfo = [];
      if (urlData.lastmod) metaInfo.push(`Last Modified: ${urlData.lastmod}`);
      if (urlData.changefreq) metaInfo.push(`Change Frequency: ${urlData.changefreq}`);
      if (urlData.priority !== undefined) metaInfo.push(`Priority: ${urlData.priority}`);
      
      return `    <div class="url-item">
        <a href="${urlData.url}" class="url-link" target="_blank">${urlData.url}</a>
        ${metaInfo.length > 0 ? `<div class="url-meta">${metaInfo.join(' | ')}</div>` : ''}
    </div>`;
    }).join('\n');

    const htmlFooter = `
</body>
</html>`;

    return `${htmlHeader}\n${urlList}\n${htmlFooter}`;
  }

  static downloadFile(content: string, filename: string, mimeType: string): void {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  private static escapeXml(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }

  static parseUrlsFromCrawlData(crawlData: any): SitemapUrl[] {
    if (!crawlData || !Array.isArray(crawlData)) {
      return [];
    }

    return crawlData.map((page: any) => ({
      url: page.url,
      lastmod: page.lastmod || new Date().toISOString().split('T')[0],
      changefreq: 'weekly' as const,
      priority: page.url === crawlData[0]?.url ? 1.0 : 0.8
    }));
  }
}