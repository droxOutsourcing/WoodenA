import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import { Contact } from "@/pages/Contact";
import { Home } from "@/pages/Home";
import { Shop } from "@/pages/Shop";
import { About } from "@/pages/About";
import { Auth } from "@/pages/Auth";
import { Dashboard } from "@/pages/Dashboard";
import { Blog } from "@/pages/Blog";
import { BlogPost } from "@/pages/BlogPost";
import { ProductDetail } from "@/pages/ProductDetail";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/product/:id">
        {(params) => <ProductDetail />}
      </Route>
      <Route path="/shop" component={Shop} />
      <Route path="/blog/:slug">
        {(params) => <BlogPost />}
      </Route>
      <Route path="/blog" component={Blog} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/auth" component={Auth} />
      <Route path="/dashboard" component={Dashboard} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
