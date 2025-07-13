import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  discount?: number;
}

export const OurProductsSection = (): JSX.Element => {
  const [location, setLocation] = useLocation();
  const { toast } = useToast();

  const featuredProducts: Product[] = [
    {
      id: 1,
      name: "Syltherine",
      price: 2500000,
      originalPrice: 3500000,
      category: "Living",
      rating: 4.5,
      image: "/placeholder-sofa.jpg",
      description: "Stylish cafe chair",
      isSale: true,
      discount: 30
    },
    {
      id: 2,
      name: "Leviosa",
      price: 2500000,
      category: "Living",
      rating: 4.8,
      image: "/placeholder-chair.jpg",
      description: "Stylish cafe chair",
      isNew: true
    },
    {
      id: 3,
      name: "Lolito",
      price: 7000000,
      originalPrice: 14000000,
      category: "Living",
      rating: 4.3,
      image: "/placeholder-sofa2.jpg",
      description: "Luxury big sofa",
      isSale: true,
      discount: 50
    },
    {
      id: 4,
      name: "Respira",
      price: 500000,
      category: "Bedroom",
      rating: 4.7,
      image: "/placeholder-bed.jpg",
      description: "Outdoor bar table and stool",
      isNew: true
    },
    {
      id: 5,
      name: "Grifo",
      price: 1500000,
      category: "Living",
      rating: 4.2,
      image: "/placeholder-lamp.jpg",
      description: "Night lamp"
    },
    {
      id: 6,
      name: "Muggo",
      price: 150000,
      category: "Dining",
      rating: 4.6,
      image: "/placeholder-mug.jpg",
      description: "Small mug",
      isNew: true
    },
    {
      id: 7,
      name: "Pingky",
      price: 7000000,
      originalPrice: 14000000,
      category: "Bedroom",
      rating: 4.4,
      image: "/placeholder-sofa3.jpg",
      description: "Cute bed set",
      isSale: true,
      discount: 50
    },
    {
      id: 8,
      name: "Potty",
      price: 500000,
      category: "Living",
      rating: 4.1,
      image: "/placeholder-pot.jpg",
      description: "Minimalist flower pot",
      isNew: true
    }
  ];

  const formatPrice = (price: number) => {
    return `Rp ${price.toLocaleString()}`;
  };

  const handleAddToCart = (product: Product) => {
    try {
      const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
      const existingItemIndex = existingCart.findIndex((item: any) => item.id === product.id);
      
      if (existingItemIndex >= 0) {
        existingCart[existingItemIndex].quantity += 1;
      } else {
        existingCart.push({
          ...product,
          quantity: 1,
          addedAt: new Date().toISOString()
        });
      }
      
      localStorage.setItem('cart', JSON.stringify(existingCart));
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
      const existingWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      const existingItem = existingWishlist.find((item: any) => item.id === product.id);
      
      if (existingItem) {
        toast({
          title: "Already in Wishlist",
          description: `${product.name} is already in your wishlist.`,
          duration: 3000,
        });
        return;
      }
      
      existingWishlist.push({
        ...product,
        addedAt: new Date().toISOString()
      });
      
      localStorage.setItem('wishlist', JSON.stringify(existingWishlist));
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
    <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-['Poppins',Helvetica] font-bold text-black text-3xl sm:text-4xl lg:text-5xl mb-4">
            Our Products
          </h2>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
              {/* Product Image */}
              <div 
                className="relative aspect-square bg-gray-200 overflow-hidden"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  setLocation(`/product/${product.id}`);
                }}
              >
                <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                  <span className="text-gray-500 text-sm">{product.name}</span>
                </div>
                
                {/* Badges */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  {product.isSale && product.discount && (
                    <Badge className="bg-red-500 text-white">
                      -{product.discount}%
                    </Badge>
                  )}
                  {product.isNew && (
                    <Badge className="bg-green-500 text-white">
                      New
                    </Badge>
                  )}
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex flex-col gap-3 items-center">
                    <Button 
                      className="bg-white text-[#b88e2f] hover:bg-gray-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(product);
                      }}
                    >
                      Add to cart
                    </Button>
                    <div className="flex gap-4 text-white">
                      <button 
                        className="flex items-center gap-1 text-sm hover:text-gray-300"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToWishlist(product);
                        }}
                      >
                        <HeartIcon className="h-4 w-4" />
                        Like
                      </button>
                      <button className="flex items-center gap-1 text-sm hover:text-gray-300">
                        <ShoppingCartIcon className="h-4 w-4" />
                        Compare
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <CardContent 
                className="p-4 cursor-pointer"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  setLocation(`/product/${product.id}`);
                }}
              >
                <h3 className="font-['Poppins',Helvetica] font-semibold text-black text-lg mb-1 hover:text-[#b88e2f] transition-colors">
                  {product.name}
                </h3>
                <p className="font-['Poppins',Helvetica] font-normal text-[#666666] text-sm mb-2">
                  {product.description}
                </p>
                
                {/* Rating */}
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon 
                      key={i} 
                      className={`h-3 w-3 ${
                        i < Math.floor(product.rating) 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-gray-300'
                      }`} 
                    />
                  ))}
                  <span className="text-xs text-gray-500 ml-1">({product.rating})</span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2">
                  <span className="font-['Poppins',Helvetica] font-semibold text-black text-lg">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="font-['Poppins',Helvetica] font-normal text-[#B0B0B0] text-sm line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Show More Button */}
        <div className="text-center">
          <Button 
            variant="outline" 
            size="lg"
            className="px-12 py-3 border-[#b88e2f] text-[#b88e2f] hover:bg-[#b88e2f] hover:text-white"
            onClick={() => setLocation('/shop')}
          >
            Show More
          </Button>
        </div>
      </div>
    </section>
  );
};