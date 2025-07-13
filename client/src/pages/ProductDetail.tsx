import { useState, useEffect } from "react";
import { useRoute, useLocation } from "wouter";
import { HeaderSection } from "./sections/HeaderSection";
import { FooterSection } from "./sections/FooterSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StarIcon, HeartIcon, ShoppingCartIcon, ShareIcon, MinusIcon, PlusIcon } from "lucide-react";
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
  sku: string;
  tags: string[];
  colors: string[];
  sizes: string[];
  stock: number;
  features: string[];
  specifications: { [key: string]: string };
}

export const ProductDetail = (): JSX.Element => {
  const [match, params] = useRoute("/product/:id");
  const [location, setLocation] = useLocation();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const { toast } = useToast();

  // Mock product data - in real app this would come from API
  const mockProducts: Product[] = [
    {
      id: 1,
      name: "Syltherine",
      price: 2500000,
      originalPrice: 3500000,
      category: "Living",
      rating: 4.5,
      image: "/placeholder-sofa.jpg",
      description: "Stylish cafe chair with elegant design perfect for modern living spaces.",
      isSale: true,
      discount: 30,
      sku: "SS001",
      tags: ["Sofa", "Living Room", "Comfort"],
      colors: ["Brown", "Black", "Gray"],
      sizes: ["L", "XL", "XXL"],
      stock: 15,
      features: [
        "High-quality wooden frame",
        "Premium fabric upholstery",
        "Comfortable cushioning",
        "Durable construction",
        "Easy to clean"
      ],
      specifications: {
        "Material": "Solid Wood & Fabric",
        "Dimensions": "200cm x 90cm x 85cm",
        "Weight": "45kg",
        "Color": "Multi-color available",
        "Warranty": "2 years"
      }
    },
    {
      id: 2,
      name: "Leviosa",
      price: 2500000,
      category: "Living",
      rating: 4.8,
      image: "/placeholder-chair.jpg",
      description: "Stylish cafe chair with ergonomic design.",
      isNew: true,
      sku: "LV002",
      tags: ["Chair", "Dining", "Cafe"],
      colors: ["Brown", "White", "Black"],
      sizes: ["Standard"],
      stock: 28,
      features: [
        "Ergonomic design",
        "Premium wood construction",
        "Comfortable seating",
        "Stackable design",
        "Easy assembly"
      ],
      specifications: {
        "Material": "Solid Wood",
        "Dimensions": "50cm x 50cm x 80cm",
        "Weight": "8kg",
        "Color": "Multiple options",
        "Warranty": "1 year"
      }
    },
    {
      id: 3,
      name: "Lolito",
      price: 7000000,
      originalPrice: 14000000,
      category: "Living",
      rating: 4.3,
      image: "/placeholder-sofa2.jpg",
      description: "Luxury big sofa with premium comfort.",
      isSale: true,
      discount: 50,
      sku: "LO003",
      tags: ["Sofa", "Luxury", "Living Room"],
      colors: ["Brown", "Beige", "Navy"],
      sizes: ["XL", "XXL"],
      stock: 8,
      features: [
        "Premium materials",
        "Extra comfortable",
        "Luxury design",
        "Durable frame",
        "Easy maintenance"
      ],
      specifications: {
        "Material": "Premium Fabric & Wood",
        "Dimensions": "220cm x 100cm x 90cm",
        "Weight": "55kg",
        "Color": "Multiple options",
        "Warranty": "3 years"
      }
    },
    {
      id: 4,
      name: "Respira",
      price: 500000,
      category: "Bedroom",
      rating: 4.7,
      image: "/placeholder-bed.jpg",
      description: "Outdoor bar table and stool for relaxation.",
      isNew: true,
      sku: "RE004",
      tags: ["Outdoor", "Bar", "Table"],
      colors: ["Natural", "Dark"],
      sizes: ["Standard"],
      stock: 20,
      features: [
        "Weather resistant",
        "Durable construction",
        "Modern design",
        "Easy assembly",
        "Comfortable height"
      ],
      specifications: {
        "Material": "Treated Wood",
        "Dimensions": "120cm x 60cm x 105cm",
        "Weight": "25kg",
        "Color": "Natural wood finish",
        "Warranty": "2 years"
      }
    },
    {
      id: 5,
      name: "Grifo",
      price: 1500000,
      category: "Living",
      rating: 4.2,
      image: "/placeholder-lamp.jpg",
      description: "Night lamp with modern design.",
      sku: "GR005",
      tags: ["Lamp", "Lighting", "Modern"],
      colors: ["White", "Black", "Gold"],
      sizes: ["Small", "Medium"],
      stock: 35,
      features: [
        "LED compatible",
        "Adjustable brightness",
        "Modern style",
        "Energy efficient",
        "Easy to use"
      ],
      specifications: {
        "Material": "Metal & Glass",
        "Dimensions": "30cm x 30cm x 45cm",
        "Weight": "3kg",
        "Power": "E27 LED",
        "Warranty": "1 year"
      }
    },
    {
      id: 6,
      name: "Muggo",
      price: 150000,
      category: "Dining",
      rating: 4.6,
      image: "/placeholder-mug.jpg",
      description: "Small mug for daily use.",
      isNew: true,
      sku: "MU006",
      tags: ["Mug", "Kitchen", "Daily"],
      colors: ["White", "Blue", "Green"],
      sizes: ["Small"],
      stock: 100,
      features: [
        "Ceramic material",
        "Dishwasher safe",
        "Heat resistant",
        "Ergonomic handle",
        "Perfect size"
      ],
      specifications: {
        "Material": "Ceramic",
        "Dimensions": "10cm x 8cm x 9cm",
        "Weight": "0.3kg",
        "Capacity": "300ml",
        "Warranty": "6 months"
      }
    },
    {
      id: 7,
      name: "Pingky",
      price: 7000000,
      originalPrice: 14000000,
      category: "Bedroom",
      rating: 4.4,
      image: "/placeholder-sofa3.jpg",
      description: "Cute bed set for comfortable sleep.",
      isSale: true,
      discount: 50,
      sku: "PI007",
      tags: ["Bed", "Bedroom", "Comfort"],
      colors: ["Pink", "White", "Cream"],
      sizes: ["Single", "Double", "Queen"],
      stock: 12,
      features: [
        "Comfortable mattress",
        "Sturdy frame",
        "Beautiful design",
        "Easy assembly",
        "Quality materials"
      ],
      specifications: {
        "Material": "Wood & Fabric",
        "Dimensions": "200cm x 160cm x 40cm",
        "Weight": "50kg",
        "Size": "Queen",
        "Warranty": "2 years"
      }
    },
    {
      id: 8,
      name: "Potty",
      price: 500000,
      category: "Living",
      rating: 4.1,
      image: "/placeholder-pot.jpg",
      description: "Minimalist flower pot for home decoration.",
      isNew: true,
      sku: "PO008",
      tags: ["Pot", "Decoration", "Minimalist"],
      colors: ["White", "Black", "Terra"],
      sizes: ["Small", "Medium", "Large"],
      stock: 50,
      features: [
        "Drainage holes",
        "Durable material",
        "Modern design",
        "Perfect size",
        "Easy to clean"
      ],
      specifications: {
        "Material": "Ceramic",
        "Dimensions": "25cm x 25cm x 30cm",
        "Weight": "2kg",
        "Style": "Minimalist",
        "Warranty": "1 year"
      }
    }
  ];

  useEffect(() => {
    console.log('ProductDetail params:', params);
    console.log('ProductDetail match:', match);
    if (params?.id) {
      const productId = parseInt(params.id);
      console.log('Looking for product ID:', productId);
      const foundProduct = mockProducts.find(p => p.id === productId);
      console.log('Found product:', foundProduct);
      if (foundProduct) {
        setProduct(foundProduct);
        setSelectedColor(foundProduct.colors[0] || "");
        setSelectedSize(foundProduct.sizes[0] || "");
        
        // Scroll to top when product loads
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        console.log('Product not found in mockProducts array');
        console.log('Available products:', mockProducts.map(p => ({ id: p.id, name: p.name })));
      }
    } else {
      console.log('No params.id found');
    }
  }, [params?.id, match]);

  const formatPrice = (price: number) => {
    return `Rp ${price.toLocaleString()}`;
  };

  const handleAddToCart = () => {
    if (!product) return;

    try {
      const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
      const existingItemIndex = existingCart.findIndex((item: any) => 
        item.id === product.id && 
        item.selectedColor === selectedColor && 
        item.selectedSize === selectedSize
      );
      
      if (existingItemIndex >= 0) {
        existingCart[existingItemIndex].quantity += quantity;
      } else {
        existingCart.push({
          ...product,
          quantity,
          selectedColor,
          selectedSize,
          addedAt: new Date().toISOString()
        });
      }
      
      localStorage.setItem('cart', JSON.stringify(existingCart));
      window.dispatchEvent(new Event('cartUpdated'));
      
      toast({
        title: "Added to Cart!",
        description: `${quantity}x ${product.name} has been added to your cart.`,
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

  const handleAddToWishlist = () => {
    if (!product) return;

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

  if (!match) {
    console.log('No route match for ProductDetail');
    return (
      <div className="w-full bg-white min-h-screen">
        <HeaderSection />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Route not found</h1>
          <Button onClick={() => setLocation('/shop')}>
            Back to Shop
          </Button>
        </div>
        <FooterSection />
      </div>
    );
  }

  if (!product) {
    console.log('Product not found, but route matched');
    return (
      <div className="w-full bg-white min-h-screen">
        <HeaderSection />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <p className="text-gray-600 mb-4">Product ID: {params?.id}</p>
          <Button onClick={() => setLocation('/shop')}>
            Back to Shop
          </Button>
        </div>
        <FooterSection />
      </div>
    );
  }

  return (
    <div className="w-full bg-white">
      <HeaderSection />
      {/* Breadcrumb Section */}
      <section className="w-full py-8 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm">
            <button 
              onClick={() => setLocation('/')}
              className="text-gray-600 hover:text-[#b88e2f] transition-colors"
            >
              Home
            </button>
            <span className="text-gray-400">/</span>
            <button 
              onClick={() => setLocation('/shop')}
              className="text-gray-600 hover:text-[#b88e2f] transition-colors"
            >
              Shop
            </button>
            <span className="text-gray-400">/</span>
            <span className="text-[#b88e2f] font-medium">{product.name}</span>
          </nav>
        </div>
      </section>

      {/* Product Detail Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <span className="text-gray-500 text-xl">{product.name}</span>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[...Array(4)].map((_, index) => (
                <div 
                  key={index}
                  className={`aspect-square bg-gray-200 rounded-lg cursor-pointer border-2 ${
                    activeImageIndex === index ? 'border-[#b88e2f]' : 'border-transparent'
                  }`}
                  onClick={() => setActiveImageIndex(index)}
                >
                  <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                    <span className="text-gray-500 text-xs">{index + 1}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-black mb-2">{product.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-[#b88e2f]">{formatPrice(product.price)}</span>
                  {product.originalPrice && (
                    <span className="text-lg text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
                  )}
                </div>
                {product.isSale && product.discount && (
                  <Badge className="bg-red-500 text-white">-{product.discount}%</Badge>
                )}
                {product.isNew && (
                  <Badge className="bg-green-500 text-white">New</Badge>
                )}
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon 
                      key={i} 
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating) 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-gray-300'
                      }`} 
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">({product.rating}) | {Math.floor(Math.random() * 50) + 10} Reviews</span>
              </div>

              <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>
            </div>

            {/* Product Options */}
            <div className="space-y-4">
              {/* Size Selection */}
              {product.sizes.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Size</h3>
                  <div className="flex gap-2">
                    {product.sizes.map((size) => (
                      <Button
                        key={size}
                        variant={selectedSize === size ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedSize(size)}
                        className={selectedSize === size ? "bg-[#b88e2f] hover:bg-[#a67c2a]" : ""}
                      >
                        {size}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Selection */}
              {product.colors.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Color</h3>
                  <div className="flex gap-2">
                    {product.colors.map((color) => (
                      <Button
                        key={color}
                        variant={selectedColor === color ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedColor(color)}
                        className={selectedColor === color ? "bg-[#b88e2f] hover:bg-[#a67c2a]" : ""}
                      >
                        {color}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Quantity</h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border rounded-lg">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      <MinusIcon className="h-4 w-4" />
                    </Button>
                    <span className="px-4 py-2 min-w-[60px] text-center">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      disabled={quantity >= product.stock}
                    >
                      <PlusIcon className="h-4 w-4" />
                    </Button>
                  </div>
                  <span className="text-sm text-gray-600">{product.stock} in stock</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-[#b88e2f] hover:bg-[#a67c2a] flex-1"
                onClick={handleAddToCart}
              >
                <ShoppingCartIcon className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={handleAddToWishlist}
              >
                <HeartIcon className="h-5 w-5 mr-2" />
                Wishlist
              </Button>
            </div>

            {/* Additional Actions */}
            <div className="flex gap-6 pt-4 border-t">
              <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800">
                <ShoppingCartIcon className="h-4 w-4" />
                Compare
              </button>
              <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800">
                <ShareIcon className="h-4 w-4" />
                Share
              </button>
            </div>

            {/* Product Meta */}
            <div className="space-y-2 pt-4 border-t text-sm">
              <div className="flex gap-4">
                <span className="text-gray-600">SKU:</span>
                <span className="font-medium">{product.sku}</span>
              </div>
              <div className="flex gap-4">
                <span className="text-gray-600">Category:</span>
                <span className="font-medium">{product.category}</span>
              </div>
              <div className="flex gap-4">
                <span className="text-gray-600">Tags:</span>
                <span className="font-medium">{product.tags.join(", ")}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="mt-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Product Description</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>
                  <h4 className="text-lg font-semibold mb-3">Key Features</h4>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-[#b88e2f] mt-1">•</span>
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="specifications" className="mt-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Specifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-gray-200">
                        <span className="font-medium text-gray-700">{key}:</span>
                        <span className="text-gray-600">{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
                  <div className="text-center py-8">
                    <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
                    <Button className="mt-4 bg-[#b88e2f] hover:bg-[#a67c2a]">
                      Write a Review
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <FooterSection />
    </div>
  );
};