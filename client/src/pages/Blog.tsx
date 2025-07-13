import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { HeaderSection } from "@/pages/sections/HeaderSection";
import { FooterSection } from "@/pages/sections/FooterSection";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, ClockIcon, UserIcon, TagIcon, SearchIcon, LoaderIcon } from "lucide-react";
import { Link, useLocation } from "wouter";
import type { BlogPost, BlogCategory } from "@shared/schema";

export const Blog = (): JSX.Element => {
  const [location, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Fetch blog posts
  const { data: blogPosts = [], isLoading: postsLoading, error: postsError } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog/posts", selectedCategory, searchQuery],
  });

  // Fetch categories
  const { data: categories = [], error: categoriesError } = useQuery<BlogCategory[]>({
    queryKey: ["/api/blog/categories"],
  });

  const categoriesWithAll = [
    { id: "all", name: "All Categories", slug: "all" },
    ...categories
  ];

  const featuredPost = blogPosts[0];
  const regularPosts = blogPosts.slice(1);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "No date";
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(' ').length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  if (postsLoading) {
    return (
      <div className="w-full bg-white min-h-screen">
        <HeaderSection />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-center min-h-[400px]">
            <LoaderIcon className="h-8 w-8 animate-spin text-[#b88e2f]" />
          </div>
        </div>
        <FooterSection />
      </div>
    );
  }

  if (postsError || categoriesError) {
    return (
      <div className="w-full bg-white min-h-screen">
        <HeaderSection />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">블로그를 불러올 수 없습니다</h2>
            <p className="text-gray-600 mb-4">
              {(postsError as Error)?.message || (categoriesError as Error)?.message || "알 수 없는 오류가 발생했습니다"}
            </p>
            <Button onClick={() => setLocation('/blog')}>
              다시 시도
            </Button>
          </div>
        </div>
        <FooterSection />
      </div>
    );
  }

  return (
    <div className="w-full bg-white min-h-screen">
      <HeaderSection />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#b88e2f] to-[#a67c2a] text-white py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl lg:text-5xl font-bold mb-4">
            WoodenA Blog
          </h1>
          <p className="text-lg lg:text-xl mb-8 max-w-2xl mx-auto">
            Discover the latest trends, tips, and insights about furniture and home design
          </p>
        </div>
      </section>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Post */}
        {featuredPost && (
          <section className="mb-16">
            <h2 className="text-2xl lg:text-3xl font-bold mb-8 text-center">Featured Article</h2>
            <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="lg:flex">
                <div className="lg:w-1/2">
                  <div className="aspect-video lg:aspect-square bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">Featured Image</span>
                  </div>
                </div>
                <div className="lg:w-1/2 p-6 lg:p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <Badge variant="secondary">Featured</Badge>
                    <span className="text-sm text-gray-500 flex items-center gap-1">
                      <CalendarIcon className="h-4 w-4" />
                      {formatDate(featuredPost.publishedAt)}
                    </span>
                  </div>
                  <h3 className="text-xl lg:text-2xl font-bold mb-4">
                    <Link href={`/blog/${featuredPost.slug}`} className="hover:text-[#b88e2f] transition-colors">
                      {featuredPost.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 mb-6 line-clamp-3">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <UserIcon className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Admin User</span>
                      <span className="text-sm text-gray-400">•</span>
                      <ClockIcon className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{calculateReadTime(featuredPost.content || "")}</span>
                    </div>
                    <Button asChild className="bg-[#b88e2f] hover:bg-[#a67c2a]">
                      <Link href={`/blog/${featuredPost.slug}`}>
                        Read More
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </section>
        )}

        {/* Search and Filter */}
        <section className="mb-12">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full lg:w-64">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categoriesWithAll.map((category) => (
                  <SelectItem key={category.slug} value={category.slug}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
                <div className="aspect-video bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500 text-sm">Article Image</span>
                </div>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-xs">
                      Article
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {formatDate(post.publishedAt)}
                    </span>
                  </div>
                  <CardTitle className="text-lg group-hover:text-[#b88e2f] transition-colors">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4 line-clamp-2">
                    {post.excerpt}
                  </CardDescription>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {post.tags?.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        <TagIcon className="h-3 w-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <UserIcon className="h-3 w-3 text-gray-500" />
                      <span className="text-xs text-gray-600">Admin User</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ClockIcon className="h-3 w-3 text-gray-500" />
                      <span className="text-xs text-gray-600">{calculateReadTime(post.content || "")}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {regularPosts.length === 0 && !postsLoading && (
            <div className="text-center py-12">
              <SearchIcon className="h-16 w-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-semibold text-gray-500 mb-2">No articles found</h3>
              <p className="text-gray-400">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </section>

        {/* Load More Button */}
        {regularPosts.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Articles
            </Button>
          </div>
        )}
      </main>

      <FooterSection />
    </div>
  );
};