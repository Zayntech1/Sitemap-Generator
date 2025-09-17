import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { SitemapForm } from './sitemap/SitemapForm';
import { SitemapTabs } from './sitemap/SitemapTabs';
import { BlogCard } from './blog/BlogCard';
import { SitemapCrawler } from '@/utils/SitemapCrawler';
import { SitemapGenerator as SitemapGen, SitemapUrl } from '@/utils/SitemapGenerator';
import { ImageSitemapGenerator, ImageData } from '@/utils/ImageSitemapGenerator';
import { VideoSitemapGenerator, VideoData } from '@/utils/VideoSitemapGenerator';
import { NewsSitemapGenerator, NewsData } from '@/utils/NewsSitemapGenerator';
import { RSSFeedGenerator, RSSItem } from '@/utils/RSSFeedGenerator';
import { BrokenLinksChecker } from '@/utils/BrokenLinksChecker';
import { Globe, Sparkles } from 'lucide-react';

export const SitemapGenerator = () => {
  const { toast } = useToast();
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [sitemapUrls, setSitemapUrls] = useState<SitemapUrl[]>([]);
  const [xmlSitemap, setXmlSitemap] = useState('');
  const [htmlSitemap, setHtmlSitemap] = useState('');
  const [imageSitemap, setImageSitemap] = useState('');
  const [videoSitemap, setVideoSitemap] = useState('');
  const [newsSitemap, setNewsSitemap] = useState('');
  const [rssFeed, setRssFeed] = useState('');
  const [brokenLinks, setBrokenLinks] = useState<string[]>([]);
  const [maxPages, setMaxPages] = useState(50);
  const [maxDepth, setMaxDepth] = useState(2);

  const handleGenerate = async () => {
    if (!url.trim()) {
      toast({
        title: "Error",
        description: "Please enter a website URL",
        variant: "destructive"
      });
      return;
    }

    // Validate URL format
    try {
      new URL(url);
    } catch {
      toast({
        title: "Error",
        description: "Please enter a valid URL (e.g., https://example.com)",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    setProgress(0);
    setSitemapUrls([]);
    setXmlSitemap('');
    setHtmlSitemap('');
    setImageSitemap('');
    setVideoSitemap('');
    setNewsSitemap('');
    setRssFeed('');
    setBrokenLinks([]);

    try {
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 15, 85));
      }, 400);

      const crawler = new SitemapCrawler(maxPages, maxDepth);
      const result = await crawler.crawlWebsite(url);
      
      clearInterval(progressInterval);
      setProgress(90);

      if (result.success && result.data) {
        const urls = SitemapGen.parseUrlsFromCrawlData(result.data);
        setSitemapUrls(urls);

        // Generate standard sitemaps
        const xml = SitemapGen.generateXML(urls);
        const html = SitemapGen.generateHTML(urls, url);
        setXmlSitemap(xml);
        setHtmlSitemap(html);

        // Generate specialized sitemaps
        const urlStrings = urls.map(u => u.url);
        
        // Generate image sitemap
        const images = ImageSitemapGenerator.extractImagesFromUrls(urlStrings);
        const imageSitemapXml = ImageSitemapGenerator.generateImageSitemapXML(images);
        setImageSitemap(imageSitemapXml);

        // Generate video sitemap
        const videos = VideoSitemapGenerator.extractVideosFromUrls(urlStrings);
        const videoSitemapXml = VideoSitemapGenerator.generateVideoSitemapXML(videos);
        setVideoSitemap(videoSitemapXml);

        // Generate news sitemap
        const news = NewsSitemapGenerator.extractNewsFromUrls(urlStrings);
        const newsSitemapXml = NewsSitemapGenerator.generateNewsSitemapXML(news);
        setNewsSitemap(newsSitemapXml);

        // Generate RSS feed
        const rssItems = RSSFeedGenerator.generateRSSFromUrls(urlStrings, url);
        const rssXml = RSSFeedGenerator.generateRSSXML(rssItems, url);
        setRssFeed(rssXml);

        // Check for broken links
        const broken = await BrokenLinksChecker.checkForBrokenLinks(urlStrings);
        setBrokenLinks(broken);

        setProgress(100);

        toast({
          title: "Success",
          description: `Generated complete sitemap suite with ${urls.length} URLs`
        });
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to generate sitemap",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error generating sitemap:', error);
      toast({
        title: "Error",
        description: "Failed to generate sitemap",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const downloadXML = () => {
    if (xmlSitemap) {
      const domain = new URL(url).hostname;
      SitemapGen.downloadFile(xmlSitemap, `${domain}-sitemap.xml`, 'application/xml');
    }
  };

  const downloadHTML = () => {
    if (htmlSitemap) {
      const domain = new URL(url).hostname;
      SitemapGen.downloadFile(htmlSitemap, `${domain}-sitemap.html`, 'text/html');
    }
  };

  const downloadImageSitemap = () => {
    if (imageSitemap) {
      const domain = new URL(url).hostname;
      ImageSitemapGenerator.downloadImageSitemap(imageSitemap, domain);
    }
  };

  const downloadVideoSitemap = () => {
    if (videoSitemap) {
      const domain = new URL(url).hostname;
      VideoSitemapGenerator.downloadVideoSitemap(videoSitemap, domain);
    }
  };

  const downloadNewsSitemap = () => {
    if (newsSitemap) {
      const domain = new URL(url).hostname;
      NewsSitemapGenerator.downloadNewsSitemap(newsSitemap, domain);
    }
  };

  const downloadRSSFeed = () => {
    if (rssFeed) {
      const domain = new URL(url).hostname;
      RSSFeedGenerator.downloadRSSFeed(rssFeed, domain);
    }
  };

  const downloadBrokenLinks = () => {
    if (brokenLinks.length > 0) {
      const domain = new URL(url).hostname;
      BrokenLinksChecker.downloadBrokenLinksReport(brokenLinks, domain);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Globe className={`h-8 w-8 text-primary ${isLoading ? 'animate-spin' : 'hover:animate-bounce-slow'} transition-all duration-300`} />
            <h1 className="text-3xl font-bold text-foreground">
              Advanced Sitemap Generator
            </h1>
            <Sparkles className="h-6 w-6 text-primary-glow animate-pulse" />
          </div>
          <p className="text-muted-foreground text-lg">
            Generate XML/HTML sitemaps, image/video sitemaps, news sitemaps, RSS feeds, and detect broken links
          </p>
        </div>

        <SitemapForm
          url={url}
          setUrl={setUrl}
          maxPages={maxPages}
          setMaxPages={setMaxPages}
          maxDepth={maxDepth}
          setMaxDepth={setMaxDepth}
          isLoading={isLoading}
          progress={progress}
          onGenerate={handleGenerate}
        />

        <BlogCard />

        <SitemapTabs
          sitemapUrls={sitemapUrls}
          xmlSitemap={xmlSitemap}
          htmlSitemap={htmlSitemap}
          imageSitemap={imageSitemap}
          videoSitemap={videoSitemap}
          newsSitemap={newsSitemap}
          rssFeed={rssFeed}
          brokenLinks={brokenLinks}
          downloadXML={downloadXML}
          downloadHTML={downloadHTML}
          downloadImageSitemap={downloadImageSitemap}
          downloadVideoSitemap={downloadVideoSitemap}
          downloadNewsSitemap={downloadNewsSitemap}
          downloadRSSFeed={downloadRSSFeed}
          downloadBrokenLinks={downloadBrokenLinks}
        />
      </div>
    </div>
  );
};