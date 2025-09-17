import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const blogPosts = [
  {
    id: 1,
    title: "Complete Guide to XML Sitemaps for Better SEO",
    description: "Learn how to create and optimize XML sitemaps to improve your website's search engine visibility and indexing.",
    content: "XML sitemaps are crucial for SEO as they help search engines discover and index your website pages more efficiently. A well-structured sitemap can significantly improve your site's visibility in search results...",
    tags: ["SEO", "XML", "Sitemaps"],
    date: "2024-01-15",
    readTime: "5 min read",
    slug: "xml-sitemaps-seo-guide"
  },
  {
    id: 2,
    title: "Video Sitemaps: Boost Your Video Content Visibility",
    description: "Discover how video sitemaps can help search engines understand and rank your video content better.",
    content: "Video content is increasingly important for SEO, and video sitemaps are the key to ensuring search engines can properly index your videos. This specialized sitemap format provides detailed metadata...",
    tags: ["Video SEO", "Sitemaps", "Content Marketing"],
    date: "2024-01-12",
    readTime: "4 min read",
    slug: "video-sitemaps-guide"
  },
  {
    id: 3,
    title: "News Sitemaps: Get Your Articles Indexed Faster",
    description: "Learn how news sitemaps can accelerate the indexing of your news articles and blog posts.",
    content: "For news websites and blogs, getting content indexed quickly is crucial. News sitemaps provide a direct channel to inform search engines about your latest articles...",
    tags: ["News SEO", "Publishing", "Google News"],
    date: "2024-01-10",
    readTime: "3 min read",
    slug: "news-sitemaps-indexing"
  },
  {
    id: 4,
    title: "Image Sitemaps: Optimize Your Visual Content for Search",
    description: "Maximize the SEO potential of your images with properly structured image sitemaps.",
    content: "Images are a valuable part of web content, but they need proper optimization to be discoverable. Image sitemaps help search engines understand your visual content...",
    tags: ["Image SEO", "Visual Content", "Optimization"],
    date: "2024-01-08",
    readTime: "4 min read",
    slug: "image-sitemaps-optimization"
  },
  {
    id: 5,
    title: "Broken Links: The Silent SEO Killer and How to Fix Them",
    description: "Learn how broken links hurt your SEO and discover tools to identify and fix them quickly.",
    content: "Broken links can severely impact your website's SEO performance and user experience. They create dead ends for both users and search engine crawlers...",
    tags: ["Link Building", "Technical SEO", "Website Health"],
    date: "2024-01-05",
    readTime: "6 min read",
    slug: "fix-broken-links-seo"
  },
  {
    id: 6,
    title: "RSS Feeds: Still Relevant for SEO in 2024",
    description: "Explore how RSS feeds continue to play a role in content distribution and SEO strategy.",
    content: "While social media dominates content sharing, RSS feeds remain a powerful tool for content distribution and SEO. They provide a structured way to syndicate content...",
    tags: ["RSS", "Content Distribution", "SEO Strategy"],
    date: "2024-01-03",
    readTime: "5 min read",
    slug: "rss-feeds-seo-2024"
  }
];

const Blog = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-primary/5">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <Link to="/">
            <Button variant="ghost" className="mb-4 hover-lift">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Sitemap Generator
            </Button>
          </Link>
          
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold gradient-text">SEO & Sitemap Blog</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Expert insights on sitemaps, SEO optimization, and web tools to boost your website's search engine performance.
            </p>
          </div>
        </div>

        <div className="grid gap-6">
          {blogPosts.map((post, index) => (
            <Card 
              key={post.id} 
              className="hover-lift animate-fade-in transition-all duration-300 hover:shadow-glow"
              style={{animationDelay: `${index * 100}ms`}}
            >
              <CardHeader>
                <div className="flex flex-wrap gap-2 mb-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <CardTitle className="text-xl hover:text-primary transition-colors cursor-pointer">
                  {post.title}
                </CardTitle>
                <CardDescription className="text-base">
                  {post.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
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
                
                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {post.content}
                </p>
                
                <Button variant="outline" className="hover-lift">
                  Read More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="glass-card p-8">
            <h2 className="text-2xl font-bold mb-4">Ready to Generate Your Sitemap?</h2>
            <p className="text-muted-foreground mb-6">
              Use our free sitemap generator tool to create XML, HTML, image, video, and news sitemaps for better SEO.
            </p>
            <Link to="/">
              <Button className="hover-lift">
                Try Sitemap Generator
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;