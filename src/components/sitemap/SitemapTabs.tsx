import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { SitemapResults } from "./SitemapResults";
import { Download, Globe, FileText, Code, Image, Video, Newspaper, Rss, AlertTriangle } from 'lucide-react';

interface SitemapTabsProps {
  sitemapUrls: any[];
  xmlSitemap: string;
  htmlSitemap: string;
  imageSitemap: string;
  videoSitemap: string;
  newsSitemap: string;
  rssFeed: string;
  brokenLinks: string[];
  downloadXML: () => void;
  downloadHTML: () => void;
  downloadImageSitemap: () => void;
  downloadVideoSitemap: () => void;
  downloadNewsSitemap: () => void;
  downloadRSSFeed: () => void;
  downloadBrokenLinks: () => void;
}

export const SitemapTabs = ({
  sitemapUrls,
  xmlSitemap,
  htmlSitemap,
  imageSitemap,
  videoSitemap,
  newsSitemap,
  rssFeed,
  brokenLinks,
  downloadXML,
  downloadHTML,
  downloadImageSitemap,
  downloadVideoSitemap,
  downloadNewsSitemap,
  downloadRSSFeed,
  downloadBrokenLinks
}: SitemapTabsProps) => {
  const [selectedOptions, setSelectedOptions] = useState({
    standard: true,
    images: false,
    videos: false,
    news: false,
    rss: false,
    broken: false,
    xml: false
  });

  if (sitemapUrls.length === 0) return null;

  const handleOptionChange = (option: keyof typeof selectedOptions) => {
    setSelectedOptions(prev => ({
      ...prev,
      [option]: !prev[option]
    }));
  };

  const getSelectedTabs = () => {
    return Object.entries(selectedOptions).filter(([_, selected]) => selected);
  };

  const selectedTabs = getSelectedTabs();
  const defaultTab = selectedTabs.length > 0 ? selectedTabs[0][0] : 'standard';

  return (
    <Card className="shadow-elegant hover-lift animate-fade-in">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary animate-pulse" />
              Generated Sitemaps & Tools
            </CardTitle>
            <CardDescription>
              <Badge variant="secondary" className="mt-2 animate-scale-in">
                {sitemapUrls.length} URLs found
              </Badge>
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Selection Interface */}
        <div className="mb-6 p-4 bg-muted/50 rounded-lg">
          <h3 className="text-sm font-medium mb-3">Select Sitemap Options:</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="standard" 
                checked={selectedOptions.standard}
                onCheckedChange={() => handleOptionChange('standard')}
              />
              <Label htmlFor="standard" className="text-sm flex items-center gap-1">
                <Globe className="h-3 w-3" />
                Standard
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="images" 
                checked={selectedOptions.images}
                onCheckedChange={() => handleOptionChange('images')}
              />
              <Label htmlFor="images" className="text-sm flex items-center gap-1">
                <Image className="h-3 w-3" />
                Images
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="videos" 
                checked={selectedOptions.videos}
                onCheckedChange={() => handleOptionChange('videos')}
              />
              <Label htmlFor="videos" className="text-sm flex items-center gap-1">
                <Video className="h-3 w-3" />
                Videos
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="news" 
                checked={selectedOptions.news}
                onCheckedChange={() => handleOptionChange('news')}
              />
              <Label htmlFor="news" className="text-sm flex items-center gap-1">
                <Newspaper className="h-3 w-3" />
                News
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="rss" 
                checked={selectedOptions.rss}
                onCheckedChange={() => handleOptionChange('rss')}
              />
              <Label htmlFor="rss" className="text-sm flex items-center gap-1">
                <Rss className="h-3 w-3" />
                RSS
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="broken" 
                checked={selectedOptions.broken}
                onCheckedChange={() => handleOptionChange('broken')}
              />
              <Label htmlFor="broken" className="text-sm flex items-center gap-1">
                <AlertTriangle className="h-3 w-3" />
                Broken
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="xml" 
                checked={selectedOptions.xml}
                onCheckedChange={() => handleOptionChange('xml')}
              />
              <Label htmlFor="xml" className="text-sm flex items-center gap-1">
                <Code className="h-3 w-3" />
                XML
              </Label>
            </div>
          </div>
        </div>

        {selectedTabs.length > 0 && (
          <Tabs defaultValue={defaultTab} className="w-full">
            <TabsList className={`grid w-full grid-cols-${selectedTabs.length} text-xs`}>
              {selectedOptions.standard && (
                <TabsTrigger value="standard" className="flex items-center gap-1">
                  <Globe className="h-3 w-3" />
                  Standard
                </TabsTrigger>
              )}
              {selectedOptions.images && (
                <TabsTrigger value="images" className="flex items-center gap-1">
                  <Image className="h-3 w-3" />
                  Images
                </TabsTrigger>
              )}
              {selectedOptions.videos && (
                <TabsTrigger value="videos" className="flex items-center gap-1">
                  <Video className="h-3 w-3" />
                  Videos
                </TabsTrigger>
              )}
              {selectedOptions.news && (
                <TabsTrigger value="news" className="flex items-center gap-1">
                  <Newspaper className="h-3 w-3" />
                  News
                </TabsTrigger>
              )}
              {selectedOptions.rss && (
                <TabsTrigger value="rss" className="flex items-center gap-1">
                  <Rss className="h-3 w-3" />
                  RSS
                </TabsTrigger>
              )}
              {selectedOptions.broken && (
                <TabsTrigger value="broken" className="flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  Broken
                </TabsTrigger>
              )}
              {selectedOptions.xml && (
                <TabsTrigger value="xml" className="flex items-center gap-1">
                  <Code className="h-3 w-3" />
                  XML
                </TabsTrigger>
              )}
            </TabsList>
            
            {selectedOptions.standard && (
              <TabsContent value="standard">
                <SitemapResults 
                  sitemapUrls={sitemapUrls}
                  xmlSitemap={xmlSitemap}
                  htmlSitemap={htmlSitemap}
                  downloadXML={downloadXML}
                  downloadHTML={downloadHTML}
                />
              </TabsContent>
            )}
            
            {selectedOptions.images && (
              <TabsContent value="images">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Image Sitemap</h3>
                    <Button variant="outline" size="sm" onClick={downloadImageSitemap} className="hover-lift">
                      <Download className="h-4 w-4 mr-2" />
                      Download XML
                    </Button>
                  </div>
                  <pre className="bg-muted p-4 rounded text-sm overflow-auto max-h-96">
                    <code>{imageSitemap || 'No images found'}</code>
                  </pre>
                </div>
              </TabsContent>
            )}
            
            {selectedOptions.videos && (
              <TabsContent value="videos">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Video Sitemap</h3>
                    <Button variant="outline" size="sm" onClick={downloadVideoSitemap} className="hover-lift">
                      <Download className="h-4 w-4 mr-2" />
                      Download XML
                    </Button>
                  </div>
                  <pre className="bg-muted p-4 rounded text-sm overflow-auto max-h-96">
                    <code>{videoSitemap || 'No videos found'}</code>
                  </pre>
                </div>
              </TabsContent>
            )}
            
            {selectedOptions.news && (
              <TabsContent value="news">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">News Sitemap</h3>
                    <Button variant="outline" size="sm" onClick={downloadNewsSitemap} className="hover-lift">
                      <Download className="h-4 w-4 mr-2" />
                      Download XML
                    </Button>
                  </div>
                  <pre className="bg-muted p-4 rounded text-sm overflow-auto max-h-96">
                    <code>{newsSitemap || 'No news articles found'}</code>
                  </pre>
                </div>
              </TabsContent>
            )}
            
            {selectedOptions.rss && (
              <TabsContent value="rss">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">RSS Feed</h3>
                    <Button variant="outline" size="sm" onClick={downloadRSSFeed} className="hover-lift">
                      <Download className="h-4 w-4 mr-2" />
                      Download XML
                    </Button>
                  </div>
                  <pre className="bg-muted p-4 rounded text-sm overflow-auto max-h-96">
                    <code>{rssFeed || 'No RSS feed generated'}</code>
                  </pre>
                </div>
              </TabsContent>
            )}
            
            {selectedOptions.broken && (
              <TabsContent value="broken">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Broken Links</h3>
                    <Button variant="outline" size="sm" onClick={downloadBrokenLinks} className="hover-lift">
                      <Download className="h-4 w-4 mr-2" />
                      Download Report
                    </Button>
                  </div>
                  <div className="max-h-96 overflow-y-auto space-y-2">
                    {brokenLinks.length > 0 ? (
                      brokenLinks.map((link, index) => (
                        <div key={index} className="p-3 bg-destructive/10 rounded border border-destructive/20 animate-fade-in">
                          <span className="text-destructive font-medium">{link}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-muted-foreground text-center py-8">No broken links found</p>
                    )}
                  </div>
                </div>
              </TabsContent>
            )}
            
            {selectedOptions.xml && (
              <TabsContent value="xml">
                <pre className="bg-muted p-4 rounded text-sm overflow-auto max-h-96">
                  <code>{xmlSitemap}</code>
                </pre>
              </TabsContent>
            )}
          </Tabs>
        )}

        {selectedTabs.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            Please select at least one sitemap option to view results.
          </div>
        )}
      </CardContent>
    </Card>
  );
};