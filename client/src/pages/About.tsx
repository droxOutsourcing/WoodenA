import React from "react";
import { HeaderSection } from "@/pages/sections/HeaderSection";
import { FooterSection } from "@/pages/sections/FooterSection";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TreePineIcon, AwardIcon, UsersIcon, LeafIcon } from "lucide-react";

export const About = (): JSX.Element => {
  const values = [
    {
      icon: <TreePineIcon className="h-12 w-12 text-[#b88e2f]" />,
      title: "Sustainable Materials",
      description: "We source only the finest sustainable wood from certified forests, ensuring our furniture is both beautiful and environmentally responsible."
    },
    {
      icon: <AwardIcon className="h-12 w-12 text-[#b88e2f]" />,
      title: "Quality Craftsmanship",
      description: "Each piece is meticulously crafted by skilled artisans with decades of experience in woodworking and furniture design."
    },
    {
      icon: <UsersIcon className="h-12 w-12 text-[#b88e2f]" />,
      title: "Customer Focused",
      description: "We believe in creating furniture that brings families together and enhances the comfort and beauty of your home."
    },
    {
      icon: <LeafIcon className="h-12 w-12 text-[#b88e2f]" />,
      title: "Eco-Friendly",
      description: "Our commitment to the environment extends beyond materials to our manufacturing processes and packaging."
    }
  ];

  return (
    <div className="w-full bg-white">
      <HeaderSection />
      
      {/* Hero Section */}
      <section className="w-full py-20 bg-[#f9f1e7]">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="font-['Poppins',Helvetica] font-bold text-black text-5xl mb-6">
            About WoodenA
          </h1>
          <p className="font-['Poppins',Helvetica] font-normal text-[#666666] text-xl max-w-3xl mx-auto leading-relaxed">
            For over three decades, WoodenA has been crafting exceptional wooden furniture that combines 
            traditional craftsmanship with modern design. We believe that furniture should not only be 
            functional but also tell a story and create lasting memories.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="w-full py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-[#b88e2f] hover:bg-[#a67c2a]">Our Story</Badge>
              <h2 className="font-['Poppins',Helvetica] font-bold text-black text-4xl mb-6">
                Crafting Excellence Since 1985
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Founded in 1985 by master craftsman Henrik Larsson, WoodenA began as a small 
                  workshop with a simple mission: to create furniture that would last generations. 
                  What started with hand-carved chairs and tables has grown into a trusted name 
                  in premium wooden furniture.
                </p>
                <p>
                  Today, we continue to honor our founder's vision while embracing innovation. 
                  Every piece we create reflects our commitment to quality, sustainability, and 
                  the timeless beauty of natural wood.
                </p>
                <p>
                  Our workshop has evolved, but our core values remain unchanged: respect for 
                  the material, attention to detail, and a deep understanding of what makes 
                  a house a home.
                </p>
              </div>
            </div>
            <div className="bg-gray-200 h-[500px] rounded-lg flex items-center justify-center">
              <span className="text-gray-500">Workshop Image</span>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="w-full py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-['Poppins',Helvetica] font-bold text-black text-4xl mb-4">
              Our Values
            </h2>
            <p className="font-['Poppins',Helvetica] font-normal text-[#666666] text-xl max-w-2xl mx-auto">
              These principles guide everything we do, from selecting materials to delivering your furniture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    {value.icon}
                  </div>
                  <CardTitle className="font-['Poppins',Helvetica] text-xl">
                    {value.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <h3 className="font-['Poppins',Helvetica] font-bold text-[#b88e2f] text-4xl mb-2">
                38+
              </h3>
              <p className="font-['Poppins',Helvetica] text-gray-600">
                Years of Experience
              </p>
            </div>
            <div>
              <h3 className="font-['Poppins',Helvetica] font-bold text-[#b88e2f] text-4xl mb-2">
                50,000+
              </h3>
              <p className="font-['Poppins',Helvetica] text-gray-600">
                Happy Customers
              </p>
            </div>
            <div>
              <h3 className="font-['Poppins',Helvetica] font-bold text-[#b88e2f] text-4xl mb-2">
                1,200+
              </h3>
              <p className="font-['Poppins',Helvetica] text-gray-600">
                Unique Designs
              </p>
            </div>
            <div>
              <h3 className="font-['Poppins',Helvetica] font-bold text-[#b88e2f] text-4xl mb-2">
                100%
              </h3>
              <p className="font-['Poppins',Helvetica] text-gray-600">
                Sustainable Wood
              </p>
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
};