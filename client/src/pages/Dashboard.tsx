import { useState, useEffect } from "react";
import { HeaderSection } from "@/pages/sections/HeaderSection";
import { FooterSection } from "@/pages/sections/FooterSection";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { UserIcon, ShoppingCartIcon, HeartIcon, SettingsIcon, EditIcon, TruckIcon, PackageIcon, CreditCardIcon, BellIcon, LogOutIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";

export const Dashboard = (): JSX.Element => {
  const [location, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, City, State 12345"
  });
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true
  });
  const { toast } = useToast();

  // Load cart and wishlist data from localStorage
  useEffect(() => {
    try {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      setCartItems(cart);
      setWishlistItems(wishlist);
    } catch (error) {
      console.error('Error loading cart/wishlist data:', error);
    }
  }, [activeTab]); // Reload when tab changes

  // Mock data for orders
  const mockOrders = [
    {
      id: "ORD-001",
      date: "2024-01-15",
      status: "Delivered",
      total: 2500000,
      items: ["Syltherine Stylish Cafe Chair", "Grifo Night Lamp"]
    },
    {
      id: "ORD-002", 
      date: "2024-01-10",
      status: "Shipped",
      total: 7000000,
      items: ["Lolito Luxury Big Sofa"]
    },
    {
      id: "ORD-003",
      date: "2024-01-05", 
      status: "Processing",
      total: 1800000,
      items: ["Coffee Table Glass", "Study Chair Ergonomic"]
    }
  ];

  // Mock wishlist data
  const mockWishlist = [
    {
      id: 1,
      name: "Vintage Armchair",
      price: 4200000,
      image: "/placeholder-armchair.jpg"
    },
    {
      id: 2,
      name: "Dining Table Set", 
      price: 8500000,
      originalPrice: 12000000,
      image: "/placeholder-dining-set.jpg"
    },
    {
      id: 3,
      name: "Bookshelf Wooden",
      price: 2800000,
      image: "/placeholder-bookshelf.jpg"
    }
  ];

  const handleProfileUpdate = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
      duration: 3000,
    });
    setIsEditingProfile(false);
  };

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
      duration: 3000,
    });
    setTimeout(() => {
      setLocation('/auth');
    }, 1000);
  };

  const formatPrice = (price: number) => {
    return `Rp ${price.toLocaleString()}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered": return "bg-green-500";
      case "Shipped": return "bg-blue-500";
      case "Processing": return "bg-yellow-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="w-full bg-white min-h-screen">
      <HeaderSection />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-12">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl lg:text-4xl font-bold text-black mb-2">Welcome back, {profileData.name.split(' ')[0]}!</h1>
              <p className="text-base lg:text-lg text-gray-600">Manage your account and track your orders</p>
            </div>
            <Button 
              variant="outline" 
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <LogOutIcon className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="cart">
              Cart {cartItems.length > 0 && <span className="ml-1 bg-[#b88e2f] text-white rounded-full px-2 py-0.5 text-xs">{cartItems.length}</span>}
            </TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="cart">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCartIcon className="h-5 w-5 text-[#b88e2f]" />
                  My Cart ({cartItems.length} items)
                </CardTitle>
                <CardDescription>
                  Items ready for checkout
                </CardDescription>
              </CardHeader>
              <CardContent>
                {cartItems.length > 0 ? (
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <Card key={item.id} className="border-l-4 border-l-[#b88e2f]">
                        <CardContent className="pt-6">
                          <div className="flex flex-col lg:flex-row gap-4">
                            <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                              <PackageIcon className="h-8 w-8 text-gray-400" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                              <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                              <div className="flex items-center gap-4">
                                <p className="text-lg font-bold text-[#b88e2f]">{formatPrice(item.price)}</p>
                                <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                              </div>
                            </div>
                            <div className="flex flex-col justify-between items-end gap-2">
                              <p className="text-xl font-bold text-[#b88e2f]">
                                {formatPrice(item.price * item.quantity)}
                              </p>
                              <div className="flex gap-2">
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => {
                                    const updatedCart = cartItems.filter(cartItem => cartItem.id !== item.id);
                                    setCartItems(updatedCart);
                                    localStorage.setItem('cart', JSON.stringify(updatedCart));
                                    toast({
                                      title: "Removed from Cart",
                                      description: `${item.name} has been removed from your cart.`,
                                      duration: 3000,
                                    });
                                  }}
                                >
                                  Remove
                                </Button>
                                <Button size="sm">
                                  Buy Now
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center mb-4">
                        <p className="text-lg font-semibold">Total: </p>
                        <p className="text-2xl font-bold text-[#b88e2f]">
                          {formatPrice(cartItems.reduce((total, item) => total + (item.price * item.quantity), 0))}
                        </p>
                      </div>
                      <Button className="w-full bg-[#b88e2f] hover:bg-[#a67c2a]" size="lg">
                        Proceed to Checkout
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <ShoppingCartIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">Your cart is empty</p>
                    <Button asChild>
                      <a href="/shop">Continue Shopping</a>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCartIcon className="h-5 w-5 text-[#b88e2f]" />
                  Order History
                </CardTitle>
                <CardDescription>
                  Track and manage all your orders
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockOrders.map((order) => (
                    <Card key={order.id} className="border-l-4 border-l-[#b88e2f]">
                      <CardContent className="pt-6">
                        <div className="flex flex-col lg:flex-row justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-4 mb-2">
                              <h3 className="font-semibold text-lg">Order #{order.id}</h3>
                              <Badge className={getStatusColor(order.status)}>
                                {order.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">Ordered on {order.date}</p>
                            <div className="space-y-1">
                              {order.items.map((item, idx) => (
                                <p key={idx} className="text-sm">• {item}</p>
                              ))}
                            </div>
                          </div>
                          <div className="flex flex-col justify-between items-end gap-2">
                            <p className="text-xl font-bold text-[#b88e2f]">{formatPrice(order.total)}</p>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <TruckIcon className="h-4 w-4 mr-1" />
                                Track
                              </Button>
                              <Button size="sm" variant="outline">
                                View Details
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="wishlist">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HeartIcon className="h-5 w-5 text-[#b88e2f]" />
                  My Wishlist
                </CardTitle>
                <CardDescription>
                  Items you've saved for later
                </CardDescription>
              </CardHeader>
              <CardContent>
                {wishlistItems.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlistItems.map((item) => (
                      <Card key={item.id} className="group hover:shadow-lg transition-shadow">
                        <div className="aspect-square bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-500 text-sm">Product Image</span>
                        </div>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">{item.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center gap-2 mb-4">
                            <span className="font-semibold text-[#b88e2f]">
                              {formatPrice(item.price)}
                            </span>
                            {item.originalPrice && (
                              <span className="text-gray-400 line-through text-sm">
                                {formatPrice(item.originalPrice)}
                              </span>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              className="bg-[#b88e2f] hover:bg-[#a67c2a] flex-1"
                              onClick={() => {
                                // Add to cart logic
                                const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
                                const existingItemIndex = existingCart.findIndex((cartItem: any) => cartItem.id === item.id);
                                
                                if (existingItemIndex >= 0) {
                                  existingCart[existingItemIndex].quantity += 1;
                                } else {
                                  existingCart.push({
                                    ...item,
                                    quantity: 1,
                                    addedAt: new Date().toISOString()
                                  });
                                }
                                
                                localStorage.setItem('cart', JSON.stringify(existingCart));
                                setCartItems(existingCart);
                                
                                toast({
                                  title: "Added to Cart!",
                                  description: `${item.name} has been added to your cart.`,
                                  duration: 3000,
                                });
                              }}
                            >
                              Add to Cart
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => {
                                const updatedWishlist = wishlistItems.filter(wishlistItem => wishlistItem.id !== item.id);
                                setWishlistItems(updatedWishlist);
                                localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
                                toast({
                                  title: "Removed from Wishlist",
                                  description: `${item.name} has been removed from your wishlist.`,
                                  duration: 3000,
                                });
                              }}
                            >
                              Remove
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <HeartIcon className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-500 mb-2">Your wishlist is empty</h3>
                    <p className="text-gray-400 mb-6">Start browsing and save items you love!</p>
                    <Button 
                      className="bg-[#b88e2f] hover:bg-[#a67c2a]"
                      onClick={() => setLocation('/shop')}
                    >
                      Browse Products
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <div className="space-y-6">
              {/* Profile Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserIcon className="h-5 w-5 text-[#b88e2f]" />
                    Profile Information
                  </CardTitle>
                  <CardDescription>
                    Update your personal information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={profileData.name}
                          onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                          disabled={!isEditingProfile}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                          disabled={!isEditingProfile}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={profileData.phone}
                          onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                          disabled={!isEditingProfile}
                        />
                      </div>
                      <div>
                        <Label htmlFor="address">Address</Label>
                        <Input
                          id="address"
                          value={profileData.address}
                          onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                          disabled={!isEditingProfile}
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {isEditingProfile ? (
                        <>
                          <Button onClick={handleProfileUpdate} className="bg-[#b88e2f] hover:bg-[#a67c2a]">
                            Save Changes
                          </Button>
                          <Button variant="outline" onClick={() => setIsEditingProfile(false)}>
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <Button onClick={() => setIsEditingProfile(true)} variant="outline">
                          <EditIcon className="h-4 w-4 mr-2" />
                          Edit Profile
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Notification Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BellIcon className="h-5 w-5 text-[#b88e2f]" />
                    Notification Preferences
                  </CardTitle>
                  <CardDescription>
                    Choose how you want to receive notifications
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-gray-600">Receive order updates and promotions via email</p>
                      </div>
                      <Switch
                        checked={notifications.email}
                        onCheckedChange={(checked) => setNotifications({...notifications, email: checked})}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">SMS Notifications</p>
                        <p className="text-sm text-gray-600">Get order updates via text message</p>
                      </div>
                      <Switch
                        checked={notifications.sms}
                        onCheckedChange={(checked) => setNotifications({...notifications, sms: checked})}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Push Notifications</p>
                        <p className="text-sm text-gray-600">Receive browser notifications</p>
                      </div>
                      <Switch
                        checked={notifications.push}
                        onCheckedChange={(checked) => setNotifications({...notifications, push: checked})}
                      />
                    </div>
                  </div>
                  <Button 
                    className="mt-6 bg-[#b88e2f] hover:bg-[#a67c2a]"
                    onClick={() => toast({
                      title: "Settings Saved",
                      description: "Your notification preferences have been updated.",
                      duration: 3000,
                    })}
                  >
                    Save Preferences
                  </Button>
                </CardContent>
              </Card>

              {/* Account Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <SettingsIcon className="h-5 w-5 text-[#b88e2f]" />
                    Account Actions
                  </CardTitle>
                  <CardDescription>
                    Manage your account security and data
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Button variant="outline" className="w-full justify-start">
                      <CreditCardIcon className="h-4 w-4 mr-2" />
                      Manage Payment Methods
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Download My Data
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50">
                      Delete Account
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {/* Quick Stats */}
              <Card className="lg:col-span-3">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PackageIcon className="h-5 w-5 text-[#b88e2f]" />
                    Quick Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <h3 className="text-2xl font-bold text-[#b88e2f]">{mockOrders.length}</h3>
                      <p className="text-sm text-gray-600">Total Orders</p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <h3 className="text-2xl font-bold text-[#b88e2f]">{mockWishlist.length}</h3>
                      <p className="text-sm text-gray-600">Wishlist Items</p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <h3 className="text-2xl font-bold text-[#b88e2f]">
                        {formatPrice(mockOrders.reduce((sum, order) => sum + order.total, 0))}
                      </h3>
                      <p className="text-sm text-gray-600">Total Spent</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Orders */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCartIcon className="h-5 w-5 text-[#b88e2f]" />
                  Recent Orders
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockOrders.slice(0, 3).map((order) => (
                    <div key={order.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg gap-2">
                      <div className="flex-1">
                        <p className="font-semibold">Order #{order.id}</p>
                        <p className="text-sm text-gray-600">{order.date}</p>
                        <p className="text-sm text-gray-500">{order.items.join(", ")}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                        <p className="font-semibold">{formatPrice(order.total)}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button 
                  variant="outline" 
                  className="w-full mt-4"
                  onClick={() => setActiveTab("orders")}
                >
                  View All Orders
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Button 
                    className="bg-[#b88e2f] hover:bg-[#a67c2a]"
                    onClick={() => setLocation('/shop')}
                  >
                    Continue Shopping
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setActiveTab("wishlist")}
                  >
                    View Wishlist
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setLocation('/contact')}
                  >
                    Contact Support
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>
      </main>
      <FooterSection />
    </div>
  );
};