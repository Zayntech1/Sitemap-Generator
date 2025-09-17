import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar, Clock, BookOpen, ExternalLink } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface BlogPost {
  id: number;
  title: string;
  description: string;
  content: string;
  tags: string[];
  date: string;
  readTime: string;
  slug: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Complete Guide to XML Sitemaps for Better SEO",
    description: "Learn how to create and optimize XML sitemaps to improve your website's search engine visibility and indexing.",
    content: "XML sitemaps are crucial for SEO as they help search engines discover and index your website pages more efficiently. A well-structured sitemap can significantly improve your site's visibility in search results.\n\nWhat is an XML Sitemap?\nAn XML sitemap is a file that lists all the important pages on your website, helping search engines like Google find and crawl your content. Think of it as a roadmap for search engine bots.\n\nKey Benefits:\n• Faster discovery of new pages\n• Better crawling of large websites\n• Improved indexing of dynamic content\n• Enhanced SEO performance\n\nBest Practices:\n1. Include only canonical URLs\n2. Update the sitemap regularly\n3. Submit to Google Search Console\n4. Keep file size under 50MB\n5. Use proper XML formatting\n\nCommon Mistakes to Avoid:\n• Including non-canonical URLs\n• Forgetting to update after site changes\n• Including blocked or redirected pages\n• Not compressing large sitemaps\n\nImplementing XML sitemaps correctly is one of the most effective technical SEO improvements you can make for your website.",
    tags: ["SEO", "XML", "Sitemaps"],
    date: "2024-01-15",
    readTime: "5 min read",
    slug: "xml-sitemaps-seo-guide"
  },
  {
    id: 2,
    title: "Video Sitemaps: Boost Your Video Content Visibility",
    description: "Discover how video sitemaps can help search engines understand and rank your video content better.",
    content: "Video content is increasingly important for SEO, and video sitemaps are the key to ensuring search engines can properly index your videos. This specialized sitemap format provides detailed metadata about your video content.\n\nWhy Video Sitemaps Matter:\nVideo sitemaps help search engines understand your video content better by providing structured data about each video, including title, description, duration, and thumbnail URL.\n\nRequired Elements:\n• Video URL or embed URL\n• Thumbnail URL\n• Title and description\n• Duration in seconds\n• Upload date\n\nOptional but Recommended:\n• Category and tags\n• Player URL\n• Expiration date\n• Rating information\n• View count\n\nBest Practices:\n1. Use high-quality thumbnails\n2. Write compelling descriptions\n3. Include accurate duration\n4. Use proper video formats\n5. Optimize for mobile viewing\n\nVideo sitemaps can significantly improve your video content's discoverability in search results and Google Video search.",
    tags: ["Video SEO", "Sitemaps", "Content Marketing"],
    date: "2024-01-12",
    readTime: "4 min read",
    slug: "video-sitemaps-guide"
  },
  {
    id: 3,
    title: "News Sitemaps: Get Your Articles Indexed Faster",
    description: "Learn how news sitemaps can accelerate the indexing of your news articles and blog posts.",
    content: "For news websites and blogs, getting content indexed quickly is crucial. News sitemaps provide a direct channel to inform search engines about your latest articles.\n\nWhat Makes News Sitemaps Special:\nNews sitemaps are designed for time-sensitive content and can help get your articles indexed within minutes of publication.\n\nKey Requirements:\n• Articles must be less than 2 days old\n• Content must be news-related\n• Proper publication date format\n• Accurate article titles\n• Clean, crawlable URLs\n\nSubmission Guidelines:\n1. Submit to Google News Publisher Center\n2. Update sitemap automatically\n3. Include only recent articles\n4. Use proper XML formatting\n5. Monitor indexing status\n\nContent Guidelines:\n• Original reporting or analysis\n• Timely, newsworthy topics\n• Proper journalistic standards\n• Clear publication dates\n• Authoritative sources\n\nNews sitemaps are essential for any website publishing time-sensitive content that needs rapid indexing.",
    tags: ["News SEO", "Publishing", "Google News"],
    date: "2024-01-10",
    readTime: "3 min read",
    slug: "news-sitemaps-indexing"
  },
  {
    id: 4,
    title: "Image Sitemaps: Optimize Your Visual Content for Search",
    description: "Maximize the SEO potential of your images with properly structured image sitemaps.",
    content: "Images are a valuable part of web content, but they need proper optimization to be discoverable. Image sitemaps help search engines understand your visual content better.\n\nWhy Image Sitemaps Matter:\nImage sitemaps provide additional context about your images that might not be apparent from the surrounding text or alt tags alone.\n\nRequired Information:\n• Image URL\n• Caption (optional but recommended)\n• Geographic location (for relevant images)\n• License information\n• Title and description\n\nBest Practices:\n1. Use descriptive filenames\n2. Provide meaningful captions\n3. Include geographic data when relevant\n4. Use high-quality images\n5. Optimize file sizes\n\nImage Optimization Tips:\n• Use proper alt text\n• Choose appropriate file formats\n• Implement lazy loading\n• Create responsive images\n• Use structured data\n\nTechnical Considerations:\n• Maximum 1,000 images per sitemap\n• Use absolute URLs\n• Include only publicly accessible images\n• Regular sitemap updates\n\nImage sitemaps can significantly improve your images' visibility in Google Images and drive additional organic traffic to your website.",
    tags: ["Image SEO", "Visual Content", "Optimization"],
    date: "2024-01-08",
    readTime: "4 min read",
    slug: "image-sitemaps-optimization"
  }
];

export const BlogCard = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <>
      <Card className="mb-6 shadow-elegant hover-lift animate-slide-up">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            SEO Blog & Resources
          </CardTitle>
          <CardDescription>
            Learn about sitemaps, SEO optimization, and best practices
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {blogPosts.slice(0, 4).map((post) => (
              <Dialog key={post.id}>
                <DialogTrigger asChild>
                  <Card className="cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-[1.02] border-border/50">
                    <CardContent className="p-4">
                      <div className="flex flex-wrap gap-1 mb-2">
                        {post.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <h3 className="font-semibold text-sm mb-2 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                        {post.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.readTime}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(post.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[80vh]">
                  <DialogHeader>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <DialogTitle className="text-xl">{post.title}</DialogTitle>
                    <DialogDescription className="text-base">
                      {post.description}
                    </DialogDescription>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(post.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {post.readTime}
                      </div>
                    </div>
                  </DialogHeader>
                  <ScrollArea className="max-h-[50vh] mt-4">
                    <div className="prose prose-sm max-w-none pr-4">
                      {post.content.split('\n').map((paragraph, index) => (
                        <p key={index} className="mb-4 text-sm leading-relaxed">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </ScrollArea>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
};