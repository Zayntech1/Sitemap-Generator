export interface VideoData {
  url: string;
  thumbnailUrl: string;
  title: string;
  description?: string;
  duration?: number;
  publicationDate?: string;
  location: string;
}

export class VideoSitemapGenerator {
  static extractVideosFromUrls(urls: string[]): VideoData[] {
    // Simulate extracting videos from crawled URLs
    const mockVideos: VideoData[] = [];
    
    urls.forEach((url, index) => {
      // Mock video extraction logic - not all pages have videos
      if (Math.random() > 0.7) { // 30% chance of having videos
        const videoCount = Math.floor(Math.random() * 3) + 1;
        for (let i = 0; i < videoCount; i++) {
          mockVideos.push({
            url: `${url}/videos/video-${index}-${i}.mp4`,
            thumbnailUrl: `${url}/thumbnails/thumb-${index}-${i}.jpg`,
            title: `Video ${i + 1} from ${new URL(url).hostname}`,
            description: `Sample video description for video ${index}-${i}`,
            duration: Math.floor(Math.random() * 600) + 30, // 30s to 10min
            publicationDate: new Date().toISOString(),
            location: url
          });
        }
      }
    });
    
    return mockVideos.slice(0, 25); // Limit to 25 videos for demo
  }

  static generateVideoSitemapXML(videos: VideoData[]): string {
    if (videos.length === 0) {
      return '';
    }

    const urlEntries = videos.map(video => `
  <url>
    <loc>${video.location}</loc>
    <video:video>
      <video:thumbnail_loc>${video.thumbnailUrl}</video:thumbnail_loc>
      <video:title>${video.title}</video:title>
      ${video.description ? `<video:description>${video.description}</video:description>` : ''}
      <video:content_loc>${video.url}</video:content_loc>
      ${video.duration ? `<video:duration>${video.duration}</video:duration>` : ''}
      ${video.publicationDate ? `<video:publication_date>${video.publicationDate}</video:publication_date>` : ''}
    </video:video>
  </url>`).join('');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">${urlEntries}
</urlset>`;
  }

  static downloadVideoSitemap(xml: string, domain: string): void {
    if (xml) {
      const blob = new Blob([xml], { type: 'application/xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${domain}-video-sitemap.xml`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  }
}