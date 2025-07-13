import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";

export const HomeHeroSection = (): JSX.Element => {
  return (
    <section className="w-full h-[716px] relative bg-[url(/figmaAssets/rectangle-1.png)] bg-cover bg-center">
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      <div className="relative z-10 flex items-center justify-end h-full pr-16">
        <div className="bg-[#fff3e3] p-16 rounded-lg max-w-2xl">
          <div className="text-left">
            <span className="font-['Poppins',Helvetica] font-semibold text-black text-base tracking-wide">
              New Arrival
            </span>
            <h1 className="font-['Poppins',Helvetica] font-bold text-[#b88e2f] text-5xl leading-tight mt-4 mb-6">
              Discover Our<br />
              New Collection
            </h1>
            <p className="font-['Poppins',Helvetica] font-medium text-black text-lg mb-12 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut<br />
              elit tellus, luctus nec ullamcorper mattis.
            </p>
            <Button className="bg-[#b88e2f] hover:bg-[#a67c2a] text-white font-['Poppins',Helvetica] font-bold text-base px-16 py-6 h-auto">
              BUY NOW
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};