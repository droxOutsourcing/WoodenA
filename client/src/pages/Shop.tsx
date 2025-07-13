import React, { useState } from "react";
import { useLocation } from "wouter";
import { HeaderSection } from "@/pages/sections/HeaderSection";
import { FooterSection } from "@/pages/sections/FooterSection";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HeartIcon, ShoppingCartIcon, StarIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  rating: number;
  image: string;
  description: string;
  isNew?: boolean;
  isSale?: boolean;
}

const mockProducts: Product[] = [
  {
    id: 1,
    name: "Syltherine Stylish Cafe Chair",
    price: 2500000,
    originalPrice: 3500000,
    category: "Dining",
    rating: 4.5,
    image: "/placeholder-chair.jpg",
    description: "Stylish cafe chair for modern dining spaces",
    isSale: true,
  },
  {
    id: 2,
    name: "Leviosa Luxury Sofa",
    price: 2500000,
    category: "Living",
    rating: 4.8,
    image: "/placeholder-sofa.jpg",
    description: "Luxury sofa for comfortable living room",
    isNew: true,
  },
  {
    id: 3,
    name: "Lolito Luxury Big Sofa",
    price: 7000000,
    originalPrice: 14000000,
    category: "Living",
    rating: 4.7,
    image: "/placeholder-big-sofa.jpg",
    description: "Spacious luxury sofa for large living spaces",
    isSale: true,
  },
  {
    id: 4,
    name: "Respira Outdoor Bar Table",
    price: 500000,
    category: "Dining",
    rating: 4.2,
    image: "/placeholder-table.jpg",
    description: "Perfect for outdoor dining experiences",
    isNew: true,
  },
  {
    id: 5,
    name: "Grifo Night Lamp",
    price: 1500000,
    category: "Bedroom",
    rating: 4.6,
    image: "/placeholder-lamp.jpg",
    description: "Modern night lamp for bedroom ambiance",
  },
  {
    id: 6,
    name: "Muggo Small Mug",
    price: 150000,
    category: "Dining",
    rating: 4.3,
    image: "/placeholder-mug.jpg",
    description: "Elegant ceramic mug for your morning coffee",
    isNew: true,
  },
  {
    id: 7,
    name: "Pingky Cute Bed Set",
    price: 7000000,
    category: "Bedroom",
    rating: 4.4,
    image: "/placeholder-bed.jpg",
    description: "Comfortable and stylish bed set for your bedroom",
  },
  {
    id: 8,
    name: "Potty Training Chair",
    price: 500000,
    originalPrice: 750000,
    category: "Dining",
    rating: 4.1,
    image: "/placeholder-training-chair.jpg",
    description: "Safe and comfortable training chair for kids",
    isSale: true,
  },
  {
    id: 9,
    name: "Modern Office Desk",
    price: 3500000,
    category: "Living",
    rating: 4.7,
    image: "/placeholder-desk.jpg",
    description: "Sleek office desk for modern workspaces",
    isNew: true,
  },
  {
    id: 10,
    name: "Vintage Armchair",
    price: 4200000,
    category: "Living",
    rating: 4.6,
    image: "/placeholder-armchair.jpg",
    description: "Classic vintage armchair with premium leather",
  },
  {
    id: 11,
    name: "Dining Table Set",
    price: 8500000,
    originalPrice: 12000000,
    category: "Dining",
    rating: 4.8,
    image: "/placeholder-dining-set.jpg",
    description: "Complete dining table set for 6 people",
    isSale: true,
  },
  {
    id: 12,
    name: "Wardrobe Cabinet",
    price: 6200000,
    category: "Bedroom",
    rating: 4.5,
    image: "/placeholder-wardrobe.jpg",
    description: "Spacious wardrobe with mirror and drawers",
  },
  {
    id: 13,
    name: "Coffee Table Glass",
    price: 1800000,
    category: "Living",
    rating: 4.3,
    image: "/placeholder-coffee-table.jpg",
    description: "Modern glass coffee table for living room",
    isNew: true,
  },
  {
    id: 14,
    name: "Study Chair Ergonomic",
    price: 1200000,
    category: "Dining",
    rating: 4.4,
    image: "/placeholder-study-chair.jpg",
    description: "Ergonomic chair perfect for study and work",
  },
  {
    id: 15,
    name: "King Size Mattress",
    price: 5500000,
    originalPrice: 7000000,
    category: "Bedroom",
    rating: 4.9,
    image: "/placeholder-mattress.jpg",
    description: "Premium memory foam king size mattress",
    isSale: true,
  },
  {
    id: 16,
    name: "Bookshelf Wooden",
    price: 2800000,
    category: "Living",
    rating: 4.2,
    image: "/placeholder-bookshelf.jpg",
    description: "Solid wood bookshelf with 5 compartments",
  },
];

export const Shop = (): JSX.Element => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("default");
  const [displayCount, setDisplayCount] = useState<number>(6);
  const [location, setLocation] = useLocation();
  const { toast } = useToast();

  const categories = ["all", "Dining", "Living", "Bedroom"];
  
  // Get search query from URL
  const urlParams = new URLSearchParams(location.split('?')[1] || '');
  const searchQuery = urlParams.get('search') || '';
  
  const filteredProducts = mockProducts.filter(product => {
    // Filter by category
    const categoryMatch = selectedCategory === "all" || product.category === selectedCategory;
    
    // Filter by search query
    const searchMatch = !searchQuery || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    return categoryMatch && searchMatch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  const displayedProducts = sortedProducts.slice(0, displayCount);
  const hasMoreProducts = displayCount < sortedProducts.length;

  const handleShowMore = () => {
    setDisplayCount(prev => prev + 6);
  };

  // Reset display count when filters change
  React.useEffect(() => {
    setDisplayCount(6);
  }, [selectedCategory, sortBy, searchQuery]);

  const formatPrice = (price: number) => {
    return `Rp ${price.toLocaleString()}`;
  };

  const handleAddToCart = (product: Product) => {
    try {
      // Get existing cart from localStorage
      const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
      
      // Check if product already exists in cart
      const existingItemIndex = existingCart.findIndex((item: any) => item.id === product.id);
      
      if (existingItemIndex >= 0) {
        // Increase quantity if product already exists
        existingCart[existingItemIndex].quantity += 1;
      } else {
        // Add new product with quantity 1
        existingCart.push({
          ...product,
          quantity: 1,
          addedAt: new Date().toISOString()
        });
      }
      
      // Save updated cart to localStorage
      localStorage.setItem('cart', JSON.stringify(existingCart));
      
      // Dispatch custom event to update header
      window.dispatchEvent(new Event('cartUpdated'));
      
      toast({
        title: "Added to Cart!",
        description: `${product.name} has been added to your cart.`,
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const handleAddToWishlist = (product: Product) => {
    try {
      // Get existing wishlist from localStorage
      const existingWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      
      // Check if product already exists in wishlist
      const existingItem = existingWishlist.find((item: any) => item.id === product.id);
      
      if (existingItem) {
        toast({
          title: "Already in Wishlist",
          description: `${product.name} is already in your wishlist.`,
          duration: 3000,
        });
        return;
      }
      
      // Add new product to wishlist
      existingWishlist.push({
        ...product,
        addedAt: new Date().toISOString()
      });
      
      // Save updated wishlist to localStorage
      localStorage.setItem('wishlist', JSON.stringify(existingWishlist));
      
      // Dispatch custom event to update header
      window.dispatchEvent(new Event('wishlistUpdated'));
      
      toast({
        title: "Added to Wishlist!",
        description: `${product.name} has been saved to your wishlist.`,
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item to wishlist. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  return (
    <div className="w-full bg-white">
      <HeaderSection />
      
      {/* Shop Header */}
      <section className="w-full py-16 bg-[#f9f1e7]">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="font-['Poppins',Helvetica] font-bold text-black text-5xl mb-4">
            {searchQuery ? `Search Results` : 'Shop'}
          </h1>
          <p className="font-['Poppins',Helvetica] font-normal text-[#666666] text-xl">
            {searchQuery 
              ? `Showing results for "${searchQuery}"` 
              : 'Browse our collection of premium wooden furniture'
            }
          </p>
          {searchQuery && (
            <div className="mt-4">
              <Button 
                variant="outline" 
                onClick={() => setLocation('/shop')}
                className="text-sm"
              >
                Clear Search
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Filters */}
      <section className="w-full py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <span className="font-['Poppins',Helvetica] font-medium text-black">
                Filter:
              </span>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="font-['Poppins',Helvetica] font-medium text-black">
                Sort by:
              </span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {displayedProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-shadow relative overflow-hidden cursor-pointer">
              {/* Product Badges */}
              <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
                {product.isNew && (
                  <Badge className="bg-green-500 hover:bg-green-600">New</Badge>
                )}
                {product.isSale && (
                  <Badge className="bg-red-500 hover:bg-red-600">Sale</Badge>
                )}
              </div>

              {/* Product Image */}
              <div 
                className="w-full h-64 bg-gray-200 flex items-center justify-center relative overflow-hidden"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  setLocation(`/product/${product.id}`);
                }}
              >
                <span className="text-gray-500 text-sm">Product Image</span>
                
                {/* Hover Actions */}
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="secondary"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(product);
                      }}
                    >
                      <ShoppingCartIcon className="h-4 w-4 mr-1" />
                      Add to Cart
                    </Button>
                    <Button 
                      size="sm" 
                      variant="secondary"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToWishlist(product);
                      }}
                    >
                      <HeartIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <CardHeader 
                className="pb-2 cursor-pointer"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  setLocation(`/product/${product.id}`);
                }}
              >
                <CardTitle className="text-lg font-['Poppins',Helvetica] text-black hover:text-[#b88e2f] transition-colors">
                  {product.name}
                </CardTitle>
                <CardDescription className="text-sm text-gray-600">
                  {product.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-['Poppins',Helvetica] font-semibold text-black text-lg">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="font-['Poppins',Helvetica] text-gray-400 line-through text-sm">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-1">
                    ({product.rating})
                  </span>
                </div>

                <Button 
                  className="w-full bg-[#b88e2f] hover:bg-[#a67c2a]"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        {hasMoreProducts && (
          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              size="lg" 
              onClick={handleShowMore}
              className="px-8 py-3"
            >
              Show More ({sortedProducts.length - displayCount} remaining)
            </Button>
          </div>
        )}

        {/* Results Summary */}
        <div className="text-center mt-8 text-gray-600">
          Showing {displayedProducts.length} of {sortedProducts.length} products
        </div>
      </main>

      <FooterSection />
    </div>
  );
};