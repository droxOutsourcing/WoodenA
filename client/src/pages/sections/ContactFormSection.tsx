import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export const ContactFormSection = (): JSX.Element => {
  // Feature data for mapping
  const features = [
    {
      icon: (
        <div className="relative w-[53px] h-[60px] bg-[url(/figmaAssets/group.png)] bg-[100%_100%]" />
      ),
      title: "High Quality",
      description: "crafted from top materials",
    },
    {
      icon: (
        <img
          className="w-[60px] h-[58px]"
          alt="Warranty Protection"
          src="/figmaAssets/group-1.png"
        />
      ),
      title: "Warranty Protection",
      description: "Over 2 years",
    },
    {
      icon: (
        <img
          className="w-[60px] h-[60px]"
          alt="Free Shipping"
          src="/figmaAssets/shipping.svg"
        />
      ),
      title: "Free Shipping",
      description: "Order over 150 $",
    },
    {
      icon: (
        <img
          className="w-[60px] h-[60px]"
          alt="Customer Support"
          src="/figmaAssets/customer-support.svg"
        />
      ),
      title: "24 / 7 Support",
      description: "Dedicated support",
    },
  ];

  return (
    <section className="w-full py-16 bg-[#faf3ea]">
      <Card className="max-w-7xl mx-auto border-none bg-transparent shadow-none">
        <CardContent className="p-0">
          <div className="flex flex-wrap justify-between gap-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2.5">
                <div className="relative w-[60px] h-[60px] flex items-center justify-center">
                  {feature.icon}
                </div>
                <div className="flex flex-col gap-0.5">
                  <h3 className="font-['Poppins',Helvetica] font-semibold text-[#242424] text-[25px] leading-[37.5px]">
                    {feature.title}
                  </h3>
                  <p className="font-['Poppins',Helvetica] font-medium text-color-gray-3 text-xl leading-[30px]">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
