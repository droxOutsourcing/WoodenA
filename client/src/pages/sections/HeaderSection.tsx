import {
  HeartIcon,
  SearchIcon,
  ShoppingCartIcon,
  UserIcon,
  XIcon,
  MenuIcon,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

export const HeaderSection = (): JSX.Element => {
  const [location, setLocation] = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);

  // Load cart and wishlist data from localStorage
  useEffect(() => {
    const loadData = () => {
      try {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        setCartItems(cart);
        setWishlistItems(wishlist);
      } catch (error) {
        console.error('Error loading cart/wishlist data:', error);
      }
    };

    loadData();
    
    // Listen for storage changes (when items are added from other pages)
    const handleStorageChange = () => {
      loadData();
    };
    
    window.addEventListener('storage', handleStorageChange);
    // Also listen for custom events when localStorage is updated from the same page
    window.addEventListener('cartUpdated', handleStorageChange);
    window.addEventListener('wishlistUpdated', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cartUpdated', handleStorageChange);
      window.removeEventListener('wishlistUpdated', handleStorageChange);
    };
  }, []);

  // Reload data when dialogs are opened
  useEffect(() => {
    if (isCartOpen || isWishlistOpen) {
      try {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        setCartItems(cart);
        setWishlistItems(wishlist);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    }
  }, [isCartOpen, isWishlistOpen]);

  const formatPrice = (price: number) => {
    return `Rp ${price.toLocaleString()}`;
  };

  const removeFromCart = (itemId: number) => {
    const updatedCart = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const removeFromWishlist = (itemId: number) => {
    const updatedWishlist = wishlistItems.filter(item => item.id !== itemId);
    setWishlistItems(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    window.dispatchEvent(new Event('wishlistUpdated'));
  };

  const addToCartFromWishlist = (item: any) => {
    const existingCart = [...cartItems];
    const existingItemIndex = existingCart.findIndex(cartItem => cartItem.id === item.id);
    
    if (existingItemIndex >= 0) {
      existingCart[existingItemIndex].quantity += 1;
    } else {
      existingCart.push({
        ...item,
        quantity: 1,
        addedAt: new Date().toISOString()
      });
    }
    
    setCartItems(existingCart);
    localStorage.setItem('cart', JSON.stringify(existingCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };
  
  // Navigation menu items data
  const navItems = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ];

  // Search suggestions based on products
  const searchSuggestions = [
    "Chairs", "Sofas", "Tables", "Beds", "Dining", "Living Room", "Bedroom",
    "Wooden Furniture", "Modern Design", "Vintage Style"
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLocation(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setLocation(`/shop?search=${encodeURIComponent(suggestion)}`);
    setIsSearchOpen(false);
    setSearchQuery("");
  };

  // Action icons data
  const actionIcons = [
    { icon: <UserIcon className="h-8 w-8" />, alt: "Account", href: "/auth" },
    { icon: <SearchIcon className="h-8 w-8" />, alt: "Search", href: "#", action: () => setIsSearchOpen(true) },
    { 
      icon: <HeartIcon className="h-8 w-8" />, 
      alt: "Wishlist", 
      href: "#", 
      action: () => setIsWishlistOpen(true),
      badge: wishlistItems.length > 0 ? wishlistItems.length : null
    },
    { 
      icon: <ShoppingCartIcon className="h-8 w-8" />, 
      alt: "Cart", 
      href: "#", 
      action: () => setIsCartOpen(true),
      badge: cartItems.length > 0 ? cartItems.length : null
    },
  ];

  return (
    <header className="w-full h-[80px] lg:h-[100px] bg-white border-b sticky top-0 z-50">
      <div className="w-full h-full mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        {/* Logo */}
        <div className="flex-shrink-0 z-10">
          <Link href="/">
            <div className="flex items-center gap-1 sm:gap-[5px] cursor-pointer hover:opacity-80 transition-opacity">
              <img
                className="w-8 h-6 sm:w-[40px] sm:h-7 lg:w-[50px] lg:h-8"
                alt="Meubel house logos"
                src="/figmaAssets/meubel-house-logos-05.png"
              />
              <div className="font-bold font-['Montserrat',Helvetica] text-black text-xl sm:text-2xl lg:text-[34px]">
                WoodenA
              </div>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation - Hidden on mobile only */}
        <div className="hidden lg:flex flex-1 justify-center mx-4 lg:mx-8">
          <NavigationMenu>
            <NavigationMenuList className="flex gap-6 lg:gap-8 xl:gap-12 2xl:gap-16">
              {navItems.map((item, index) => (
                <NavigationMenuItem key={index}>
                  <Link href={item.href}>
                    <span
                      className={`font-['Poppins',Helvetica] font-medium text-sm lg:text-base cursor-pointer hover:text-gray-600 transition-colors whitespace-nowrap ${
                        location === item.href ? 'text-black font-semibold' : 'text-black'
                      }`}
                    >
                      {item.label}
                    </span>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Mobile Menu Button - Only on small screens */}
        <div className="flex-1 flex justify-end lg:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="mr-2">
                <MenuIcon className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle className="text-left">Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-6 mt-8">
                {navItems.map((item, index) => (
                  <Link 
                    key={index} 
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span
                      className={`font-['Poppins',Helvetica] font-medium text-lg cursor-pointer hover:text-gray-600 transition-colors block py-2 ${
                        location === item.href ? 'text-black font-semibold' : 'text-black'
                      }`}
                    >
                      {item.label}
                    </span>
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Action Icons - Responsive spacing */}
        <div className="flex-shrink-0 flex items-center gap-2 sm:gap-3 lg:gap-4 xl:gap-6">
          {actionIcons.map((item, index) => (
            item.href === "#" ? (
              <div key={index} className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="p-2 h-12 w-12 hover:bg-gray-100 transition-colors"
                  aria-label={item.alt}
                  onClick={item.action || undefined}
                >
                  {item.icon}
                </Button>
                {item.badge && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 bg-[#b88e2f] hover:bg-[#b88e2f] text-white text-xs flex items-center justify-center rounded-full">
                    {item.badge}
                  </Badge>
                )}
              </div>
            ) : (
              <Link key={index} href={item.href}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="p-2 h-12 w-12 hover:bg-gray-100 transition-colors"
                  aria-label={item.alt}
                >
                  {item.icon}
                </Button>
              </Link>
            )
          ))}
        </div>

        {/* Search Dialog */}
        <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
          <DialogContent className="w-[95vw] max-w-[500px] mx-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-base sm:text-lg">
                <SearchIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                Search Products
              </DialogTitle>
              <DialogDescription className="text-sm">
                Search for furniture by name, category, or description
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSearch} className="space-y-4">
              <Input
                placeholder="Search for furniture..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="text-base sm:text-lg"
                autoFocus
              />
              
              <div className="flex flex-col sm:flex-row gap-2">
                <Button 
                  type="submit" 
                  className="bg-[#b88e2f] hover:bg-[#a67c2a] flex-1 sm:flex-none"
                >
                  Search
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsSearchOpen(false)}
                  className="flex-1 sm:flex-none"
                >
                  Cancel
                </Button>
              </div>
            </form>

            {/* Search Suggestions */}
            <div className="space-y-3">
              <p className="text-sm text-gray-600 font-medium">Popular searches:</p>
              <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
                {searchSuggestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="text-xs sm:text-sm justify-center"
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Wishlist Dialog */}
        <Dialog open={isWishlistOpen} onOpenChange={setIsWishlistOpen}>
          <DialogContent className="w-[95vw] max-w-[600px] mx-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-base sm:text-lg">
                <HeartIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                Wishlist
              </DialogTitle>
              <DialogDescription className="text-sm">
                Your saved favorite furniture items
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 max-h-[60vh] sm:max-h-[400px] overflow-y-auto">
              {wishlistItems.length > 0 ? (
                <div className="space-y-4">
                  {wishlistItems.map((item) => (
                    <Card key={item.id} className="p-4">
                      <div className="flex gap-4">
                        <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                          <HeartIcon className="h-8 w-8 text-gray-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm truncate">{item.name}</h3>
                          <p className="text-xs text-gray-600 line-clamp-2">{item.description}</p>
                          <p className="text-sm font-bold text-[#b88e2f] mt-1">{formatPrice(item.price)}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Button 
                            size="sm" 
                            className="bg-[#b88e2f] hover:bg-[#a67c2a] text-xs px-2"
                            onClick={() => addToCartFromWishlist(item)}
                          >
                            Add to Cart
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="text-xs px-2"
                            onClick={() => removeFromWishlist(item.id)}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 sm:py-8">
                  <HeartIcon className="h-10 w-10 sm:h-12 sm:w-12 mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500 text-base sm:text-lg">Your wishlist is empty</p>
                  <p className="text-gray-400 text-sm">Browse our shop and save items you love!</p>
                  <Button 
                    className="mt-4 bg-[#b88e2f] hover:bg-[#a67c2a] w-full sm:w-auto"
                    onClick={() => {
                      setIsWishlistOpen(false);
                      window.location.href = '/shop';
                    }}
                  >
                    Browse Shop
                  </Button>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* Cart Dialog */}
        <Dialog open={isCartOpen} onOpenChange={setIsCartOpen}>
          <DialogContent className="w-[95vw] max-w-[600px] mx-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-base sm:text-lg">
                <ShoppingCartIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                Shopping Cart
              </DialogTitle>
              <DialogDescription className="text-sm">
                Review your selected items before checkout
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              {cartItems.length > 0 ? (
                <>
                  <div className="space-y-4 max-h-[300px] overflow-y-auto">
                    {cartItems.map((item) => (
                      <Card key={item.id} className="p-4">
                        <div className="flex gap-4">
                          <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                            <ShoppingCartIcon className="h-8 w-8 text-gray-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-sm truncate">{item.name}</h3>
                            <p className="text-xs text-gray-600 line-clamp-2">{item.description}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <p className="text-sm font-bold text-[#b88e2f]">{formatPrice(item.price)}</p>
                              <span className="text-xs text-gray-500">× {item.quantity}</span>
                            </div>
                          </div>
                          <div className="flex flex-col justify-between items-end">
                            <p className="text-sm font-bold text-[#b88e2f]">
                              {formatPrice(item.price * item.quantity)}
                            </p>
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="text-xs px-2"
                              onClick={() => removeFromCart(item.id)}
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                  
                  {/* Cart Summary */}
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center text-base sm:text-lg font-semibold">
                      <span>Total:</span>
                      <span>{formatPrice(cartItems.reduce((total, item) => total + (item.price * item.quantity), 0))}</span>
                    </div>
                    <Button 
                      className="w-full mt-4 bg-[#b88e2f] hover:bg-[#a67c2a]"
                      onClick={() => {
                        setIsCartOpen(false);
                        window.location.href = '/dashboard';
                      }}
                    >
                      Proceed to Checkout
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center py-6 sm:py-8">
                  <ShoppingCartIcon className="h-10 w-10 sm:h-12 sm:w-12 mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500 text-base sm:text-lg">Your cart is empty</p>
                  <p className="text-gray-400 text-sm">Add some beautiful furniture to get started!</p>
                  <Button 
                    className="mt-4 bg-[#b88e2f] hover:bg-[#a67c2a] w-full sm:w-auto"
                    onClick={() => {
                      setIsCartOpen(false);
                      window.location.href = '/shop';
                    }}
                  >
                    Start Shopping
                  </Button>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  );
};
