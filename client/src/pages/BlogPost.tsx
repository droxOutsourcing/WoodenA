import { useState } from "react";
import { useRoute, useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { HeaderSection } from "@/pages/sections/HeaderSection";
import { FooterSection } from "@/pages/sections/FooterSection";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CalendarIcon, ClockIcon, UserIcon, TagIcon, ArrowLeftIcon, MessageCircleIcon, ShareIcon, LoaderIcon } from "lucide-react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { BlogPost, BlogComment } from "@shared/schema";

export const BlogPost = (): JSX.Element => {
  const [match, params] = useRoute("/blog/:slug");
  const [location, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [commentForm, setCommentForm] = useState({
    name: "",
    email: "",
    content: ""
  });

  // Fetch blog post
  const { data: post, isLoading: postLoading, error } = useQuery<BlogPost>({
    queryKey: ["/api/blog/posts", params?.slug],
    queryFn: async () => {
      if (!params?.slug) throw new Error("No slug provided");
      const response = await fetch(`/api/blog/posts/${params.slug}`);
      if (!response.ok) throw new Error("Failed to fetch post");
      return response.json();
    },
    enabled: !!params?.slug,
  });

  // Fetch comments
  const { data: comments = [] } = useQuery<BlogComment[]>({
    queryKey: ["/api/blog/posts", post?.id, "comments"],
    queryFn: async () => {
      if (!post?.id) return [];
      const response = await fetch(`/api/blog/posts/${post.id}/comments`);
      if (!response.ok) throw new Error("Failed to fetch comments");
      return response.json();
    },
    enabled: !!post?.id,
  });

  // Submit comment mutation
  const commentMutation = useMutation({
    mutationFn: async (comment: { name: string; email: string; content: string }) => {
      if (!post?.id) throw new Error("No post ID");
      return apiRequest("POST", `/api/blog/posts/${post.id}/comments`, comment);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/blog/posts", post?.id, "comments"] });
      setCommentForm({ name: "", email: "", content: "" });
      toast({
        title: "Comment Submitted",
        description: "Your comment has been submitted and is pending approval.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit comment. Please try again.",
        variant: "destructive"
      });
    },
  });

  // Fetch related posts
  const { data: relatedPosts = [] } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog/posts", "related"],
    queryFn: async () => {
      const response = await fetch("/api/blog/posts?limit=3");
      if (!response.ok) throw new Error("Failed to fetch related posts");
      const posts = await response.json();
      return posts.filter((p: BlogPost) => p.id !== post?.id).slice(0, 3);
    },
    enabled: !!post?.id,
  });

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "No date";
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatCommentDate = (dateString: string | null) => {
    if (!dateString) return "No date";
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(' ').length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentForm.name || !commentForm.email || !commentForm.content) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    commentMutation.mutate(commentForm);
  };

  const handleShare = async () => {
    if (navigator.share && post) {
      try {
        await navigator.share({
          title: post.title,
          url: `${window.location.origin}${location}`,
        });
      } catch (error) {
        // User cancelled sharing or sharing failed, fall back to clipboard
        if (error instanceof Error && error.name !== 'AbortError') {
          navigator.clipboard.writeText(`${window.location.origin}${location}`);
          toast({
            title: "Link Copied",
            description: "Article link has been copied to clipboard.",
          });
        }
        // Ignore AbortError (user cancelled sharing)
      }
    } else {
      navigator.clipboard.writeText(`${window.location.origin}${location}`);
      toast({
        title: "Link Copied",
        description: "Article link has been copied to clipboard.",
      });
    }
  };

  if (!match) {
    return <div>Post not found</div>;
  }

  if (postLoading) {
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

  if (error || !post) {
    return (
      <div className="w-full bg-white min-h-screen">
        <HeaderSection />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-500 mb-4">Post Not Found</h1>
            <p className="text-gray-400 mb-6">The blog post you're looking for doesn't exist.</p>
            <Button asChild>
              <Link href="/blog">Back to Blog</Link>
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
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Button variant="ghost" asChild className="gap-2">
            <Link href="/blog">
              <ArrowLeftIcon className="h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <article className="lg:col-span-3">
            {/* Article Header */}
            <header className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <Badge variant="secondary">Article</Badge>
                <span className="text-sm text-gray-500 flex items-center gap-1">
                  <CalendarIcon className="h-4 w-4" />
                  {formatDate(post.publishedAt)}
                </span>
                <span className="text-sm text-gray-500 flex items-center gap-1">
                  <ClockIcon className="h-4 w-4" />
                  {calculateReadTime(post.content || "")}
                </span>
              </div>
              
              <h1 className="text-3xl lg:text-4xl font-bold mb-4">
                {post.title}
              </h1>
              
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <UserIcon className="h-5 w-5 text-gray-500" />
                  <span className="text-gray-600">By Admin User</span>
                </div>
                <Button onClick={handleShare} variant="outline" size="sm" className="gap-2">
                  <ShareIcon className="h-4 w-4" />
                  Share
                </Button>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags?.map((tag, index) => (
                  <Badge key={index} variant="outline" className="gap-1">
                    <TagIcon className="h-3 w-3" />
                    {tag}
                  </Badge>
                ))}
              </div>
            </header>

            {/* Featured Image */}
            <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center mb-8">
              <span className="text-gray-500">Featured Image</span>
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none mb-12">
              <div className="whitespace-pre-line leading-relaxed">
                {post.content}
              </div>
            </div>

            <Separator className="mb-8" />

            {/* Comments Section */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <MessageCircleIcon className="h-6 w-6" />
                Comments ({comments.length})
              </h2>

              {/* Comment Form */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Leave a Comment</CardTitle>
                  <CardDescription>
                    Share your thoughts about this article
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleCommentSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Name *</Label>
                        <Input
                          id="name"
                          value={commentForm.name}
                          onChange={(e) => setCommentForm({...commentForm, name: e.target.value})}
                          placeholder="Your name"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={commentForm.email}
                          onChange={(e) => setCommentForm({...commentForm, email: e.target.value})}
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="content">Comment *</Label>
                      <Textarea
                        id="content"
                        value={commentForm.content}
                        onChange={(e) => setCommentForm({...commentForm, content: e.target.value})}
                        placeholder="Share your thoughts..."
                        rows={4}
                        required
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="bg-[#b88e2f] hover:bg-[#a67c2a]"
                      disabled={commentMutation.isPending}
                    >
                      {commentMutation.isPending ? "Posting..." : "Post Comment"}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Comments List */}
              <div className="space-y-6">
                {comments.map((comment) => (
                  <Card key={comment.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <UserIcon className="h-5 w-5 text-gray-500" />
                          <span className="font-medium">{comment.authorName}</span>
                        </div>
                        <span className="text-sm text-gray-500">
                          {formatCommentDate(comment.createdAt)}
                        </span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        {comment.content}
                      </p>
                    </CardContent>
                  </Card>
                ))}
                
                {comments.length === 0 && (
                  <div className="text-center py-8">
                    <MessageCircleIcon className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500">No comments yet. Be the first to comment!</p>
                  </div>
                )}
              </div>
            </section>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            {/* Related Posts */}
            <Card>
              <CardHeader>
                <CardTitle>Related Articles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {relatedPosts.map((relatedPost) => (
                    <div key={relatedPost.id} className="group">
                      <h3 className="font-medium mb-2">
                        <Link 
                          href={`/blog/${relatedPost.slug}`}
                          className="hover:text-[#b88e2f] transition-colors"
                        >
                          {relatedPost.title}
                        </Link>
                      </h3>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Badge variant="outline" className="text-xs">
                          Related
                        </Badge>
                        <span>{formatDate(relatedPost.publishedAt)}</span>
                      </div>
                      <Separator className="mt-4" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>

      <FooterSection />
    </div>
  );
};