import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, Globe, Code, FileText } from 'lucide-react';
import { SitemapUrl } from '@/utils/SitemapGenerator';

interface SitemapResultsProps {
  sitemapUrls: SitemapUrl[];
  xmlSitemap: string;
  htmlSitemap: string;
  downloadXML: () => void;
  downloadHTML: () => void;
}

export const SitemapResults = ({
  sitemapUrls,
  xmlSitemap,
  htmlSitemap,
  downloadXML,
  downloadHTML
}: SitemapResultsProps) => {
  return (
    <div className="space-y-4">
      <div className="flex gap-2 justify-end">
        <Button variant="outline" size="sm" onClick={downloadXML} className="hover-lift">
          <Download className="h-4 w-4 mr-2" />
          XML
        </Button>
        <Button variant="outline" size="sm" onClick={downloadHTML} className="hover-lift">
          <Download className="h-4 w-4 mr-2" />
          HTML
        </Button>
      </div>
      
      <Tabs defaultValue="preview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="preview" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Preview
          </TabsTrigger>
          <TabsTrigger value="xml" className="flex items-center gap-2">
            <Code className="h-4 w-4" />
            XML
          </TabsTrigger>
          <TabsTrigger value="html" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            HTML
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="preview" className="space-y-2">
          <div className="max-h-96 overflow-y-auto space-y-2">
            {sitemapUrls.slice(0, 20).map((urlData, index) => (
              <div 
                key={index} 
                className="p-3 bg-accent/50 rounded border hover-lift animate-fade-in transition-all duration-300 hover:bg-accent/70"
                style={{animationDelay: `${index * 50}ms`}}
              >
                <a href={urlData.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium transition-colors duration-200">
                  {urlData.url}
                </a>
                <div className="text-sm text-muted-foreground mt-1">
                  Priority: {urlData.priority} | Change Freq: {urlData.changefreq}
                </div>
              </div>
            ))}
            {sitemapUrls.length > 20 && (
              <p className="text-sm text-muted-foreground text-center py-2 animate-pulse-soft">
                ... and {sitemapUrls.length - 20} more URLs
              </p>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="xml">
          <pre className="bg-muted p-4 rounded text-sm overflow-auto max-h-96">
            <code>{xmlSitemap}</code>
          </pre>
        </TabsContent>
        
        <TabsContent value="html">
          <div className="bg-muted p-4 rounded max-h-96 overflow-auto">
            <iframe srcDoc={htmlSitemap} className="w-full h-64 border rounded" title="HTML Sitemap Preview" />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};