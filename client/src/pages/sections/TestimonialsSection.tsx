import { Card, CardContent } from "@/components/ui/card";
import { StarIcon, QuoteIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const TestimonialsSection = (): JSX.Element => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Interior Designer",
      rating: 5,
      comment: "WoodenA has completely transformed my approach to furniture selection. The quality and craftsmanship are exceptional, and my clients are always impressed with the results.",
      initials: "SJ"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Homeowner",
      rating: 5,
      comment: "I've furnished my entire home with WoodenA pieces. The attention to detail and sustainable materials make every purchase feel like an investment in quality.",
      initials: "MC"
    },
    {
      id: 3,
      name: "Emma Davis",
      role: "Property Developer",
      rating: 5,
      comment: "Working with WoodenA for our luxury developments has been outstanding. Their furniture adds the perfect finishing touch to our properties.",
      initials: "ED"
    },
    {
      id: 4,
      name: "David Wilson",
      role: "Restaurant Owner",
      rating: 4,
      comment: "The commercial furniture from WoodenA has elevated our restaurant's ambiance. Customers frequently compliment the beautiful dining setup.",
      initials: "DW"
    }
  ];

  return (
    <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-['Poppins',Helvetica] font-bold text-black text-3xl sm:text-4xl lg:text-5xl mb-4">
            What Our Customers Say
          </h2>
          <p className="font-['Poppins',Helvetica] font-normal text-[#666666] text-lg sm:text-xl max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our customers have to say about their WoodenA experience.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="relative border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                {/* Quote Icon */}
                <QuoteIcon className="h-8 w-8 text-[#b88e2f] mb-4" />
                
                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon 
                      key={i} 
                      className={`h-4 w-4 ${
                        i < testimonial.rating 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-gray-300'
                      }`} 
                    />
                  ))}
                </div>

                {/* Comment */}
                <p className="font-['Poppins',Helvetica] font-normal text-[#666666] text-sm sm:text-base mb-6 leading-relaxed">
                  "{testimonial.comment}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-[#b88e2f] text-white font-semibold">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-['Poppins',Helvetica] font-semibold text-black text-sm">
                      {testimonial.name}
                    </h4>
                    <p className="font-['Poppins',Helvetica] font-normal text-[#666666] text-xs">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="font-['Poppins',Helvetica] font-normal text-[#666666] text-lg mb-4">
            Join thousands of satisfied customers
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-[#666666]">
            <div className="flex -space-x-2">
              {[...Array(5)].map((_, i) => (
                <Avatar key={i} className="h-8 w-8 border-2 border-white">
                  <AvatarFallback className="bg-[#b88e2f] text-white text-xs">
                    {String.fromCharCode(65 + i)}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
            <span>2000+ Happy Customers</span>
          </div>
        </div>
      </div>
    </section>
  );
};