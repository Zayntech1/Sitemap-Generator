import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Loader2, Sparkles, Settings } from 'lucide-react';

interface SitemapFormProps {
  url: string;
  setUrl: (url: string) => void;
  maxPages: number;
  setMaxPages: (pages: number) => void;
  maxDepth: number;
  setMaxDepth: (depth: number) => void;
  isLoading: boolean;
  progress: number;
  onGenerate: () => void;
}

export const SitemapForm = ({
  url,
  setUrl,
  maxPages,
  setMaxPages,
  maxDepth,
  setMaxDepth,
  isLoading,
  progress,
  onGenerate
}: SitemapFormProps) => {
  return (
    <Card className="mb-6 shadow-elegant hover-lift animate-slide-up">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5 text-primary" />
          Website URL & Settings
        </CardTitle>
        <CardDescription>Configure your sitemap generation settings</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="url">Website URL</Label>
          <Input 
            id="url" 
            type="url" 
            value={url} 
            onChange={e => setUrl(e.target.value)} 
            placeholder="https://example.com" 
            disabled={isLoading} 
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="maxPages">Max Pages</Label>
            <Input 
              id="maxPages" 
              type="number" 
              value={maxPages} 
              onChange={e => setMaxPages(Number(e.target.value))} 
              min="1" 
              max="1000" 
              disabled={isLoading} 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="maxDepth">Max Depth</Label>
            <Input 
              id="maxDepth" 
              type="number" 
              value={maxDepth} 
              onChange={e => setMaxDepth(Number(e.target.value))} 
              min="1" 
              max="10" 
              disabled={isLoading} 
            />
          </div>
        </div>

        {isLoading && (
          <div className="space-y-4 animate-scale-in">
            <div className="flex items-center gap-3 justify-center">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
              <span className="text-sm font-medium">Crawling website...</span>
            </div>
            <Progress value={progress} className="w-full transition-all duration-300" />
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground text-center animate-pulse-soft">
                Discovering pages... {progress}%
              </p>
              <div className="flex justify-center space-x-1">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
              </div>
            </div>
          </div>
        )}

        <Button 
          onClick={onGenerate} 
          disabled={isLoading} 
          variant="gradient" 
          className="w-full hover-glow transition-all duration-300 transform hover:scale-[1.02]"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Generating...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Generate Sitemap
            </div>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};