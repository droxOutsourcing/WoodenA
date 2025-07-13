import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const BrowseRangeSection = (): JSX.Element => {
  const [location, setLocation] = useLocation();

  const categories = [
    {
      id: 1,
      name: "Dining",
      image: "/placeholder-dining.jpg",
      description: "Elegant dining sets for family gatherings"
    },
    {
      id: 2,
      name: "Living",
      image: "/placeholder-living.jpg", 
      description: "Comfortable living room furniture"
    },
    {
      id: 3,
      name: "Bedroom",
      image: "/placeholder-bedroom.jpg",
      description: "Peaceful bedroom collections"
    }
  ];

  return (
    <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-['Poppins',Helvetica] font-bold text-black text-3xl sm:text-4xl lg:text-5xl mb-4">
            Browse The Range
          </h2>
          <p className="font-['Poppins',Helvetica] font-normal text-[#666666] text-lg sm:text-xl max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Card key={category.id} className="group cursor-pointer border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-0">
                <div className="aspect-[4/3] bg-gray-200 rounded-t-lg overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                    <span className="text-gray-500 text-lg">{category.name} Image</span>
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="font-['Poppins',Helvetica] font-semibold text-black text-xl sm:text-2xl mb-2">
                    {category.name}
                  </h3>
                  <p className="font-['Poppins',Helvetica] font-normal text-[#666666] text-sm sm:text-base mb-4">
                    {category.description}
                  </p>
                  <Button 
                    variant="outline" 
                    className="group-hover:bg-[#b88e2f] group-hover:text-white group-hover:border-[#b88e2f] transition-colors"
                    onClick={() => setLocation(`/shop?category=${category.name}`)}
                  >
                    Shop {category.name}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};