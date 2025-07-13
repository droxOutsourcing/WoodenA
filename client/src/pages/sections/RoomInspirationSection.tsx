import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRightIcon, ArrowRightIcon } from "lucide-react";
import { useState } from "react";

export const RoomInspirationSection = (): JSX.Element => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [location, setLocation] = useLocation();

  const inspirations = [
    {
      id: 1,
      title: "Inner Peace",
      subtitle: "Bed Room",
      image: "/placeholder-bedroom-inspiration.jpg",
      description: "Create a peaceful sanctuary with our bedroom collection"
    },
    {
      id: 2,
      title: "Living Harmony",
      subtitle: "Living Room", 
      image: "/placeholder-living-inspiration.jpg",
      description: "Transform your living space into a harmonious retreat"
    },
    {
      id: 3,
      title: "Dining Elegance",
      subtitle: "Dining Room",
      image: "/placeholder-dining-inspiration.jpg", 
      description: "Elevate your dining experience with elegant furniture"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % inspirations.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + inspirations.length) % inspirations.length);
  };

  return (
    <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-[#FCF8F3]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h2 className="font-['Poppins',Helvetica] font-bold text-black text-3xl sm:text-4xl lg:text-5xl leading-tight">
              50+ Beautiful rooms inspiration
            </h2>
            <p className="font-['Poppins',Helvetica] font-normal text-[#616161] text-lg">
              Our designer already made a lot of beautiful prototype of rooms that inspire you
            </p>
            <Button 
              className="bg-[#b88e2f] hover:bg-[#a67c2a] text-white px-8 py-3"
              onClick={() => setLocation('/shop')}
            >
              Explore More
            </Button>
          </div>

          {/* Right Content - Carousel */}
          <div className="relative">
            <div className="overflow-hidden rounded-lg">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {inspirations.map((inspiration) => (
                  <div key={inspiration.id} className="w-full flex-shrink-0">
                    <Card className="relative overflow-hidden border-0 shadow-xl">
                      <div className="aspect-[4/3] bg-gradient-to-br from-gray-200 to-gray-300">
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-gray-500 text-lg">{inspiration.title}</span>
                        </div>
                        
                        {/* Overlay Content */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                          <div className="text-white">
                            <p className="text-sm opacity-80 mb-1">{inspiration.subtitle}</p>
                            <h3 className="font-['Poppins',Helvetica] font-semibold text-2xl mb-2">
                              {inspiration.title}
                            </h3>
                            <p className="text-sm opacity-90 mb-4">
                              {inspiration.description}
                            </p>
                            <Button 
                              size="sm" 
                              className="bg-[#b88e2f] hover:bg-[#a67c2a] text-white"
                            >
                              <ArrowRightIcon className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-center gap-4 mt-6">
              <Button
                variant="outline"
                size="icon"
                onClick={prevSlide}
                className="rounded-full"
              >
                <ChevronRightIcon className="h-4 w-4 rotate-180" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={nextSlide}
                className="rounded-full"
              >
                <ChevronRightIcon className="h-4 w-4" />
              </Button>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-4">
              {inspirations.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentSlide ? 'bg-[#b88e2f]' : 'bg-gray-300'
                  }`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};