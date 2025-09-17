export interface ImageData {
  url: string;
  caption?: string;
  title?: string;
  location?: string;
  license?: string;
}

export class ImageSitemapGenerator {
  static extractImagesFromUrls(urls: string[]): ImageData[] {
    // Simulate extracting images from crawled URLs
    const mockImages: ImageData[] = [];
    
    urls.forEach((url, index) => {
      // Mock image extraction logic
      const imageCount = Math.floor(Math.random() * 5) + 1;
      for (let i = 0; i < imageCount; i++) {
        mockImages.push({
          url: `${url}/images/image-${index}-${i}.jpg`,
          caption: `Image ${i + 1} from ${new URL(url).hostname}`,
          title: `Sample Image ${index}-${i}`,
          location: url
        });
      }
    });
    
    return mockImages.slice(0, 50); // Limit to 50 images for demo
  }

  static generateImageSitemapXML(images: ImageData[]): string {
    if (images.length === 0) {
      return '';
    }

    const urlEntries = images.map(image => `
  <url>
    <loc>${image.location}</loc>
    <image:image>
      <image:loc>${image.url}</image:loc>
      ${image.caption ? `<image:caption>${image.caption}</image:caption>` : ''}
      ${image.title ? `<image:title>${image.title}</image:title>` : ''}
      ${image.license ? `<image:license>${image.license}</image:license>` : ''}
    </image:image>
  </url>`).join('');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">${urlEntries}
</urlset>`;
  }

  static downloadImageSitemap(xml: string, domain: string): void {
    if (xml) {
      const blob = new Blob([xml], { type: 'application/xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${domain}-image-sitemap.xml`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  }
}