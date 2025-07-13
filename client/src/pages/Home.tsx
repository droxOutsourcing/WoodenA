import React from "react";
import { FooterSection } from "./sections/FooterSection";
import { HeaderSection } from "./sections/HeaderSection";
import { HomeHeroSection } from "./sections/HomeHeroSection";
import { HomeInfoSection } from "./sections/HomeInfoSection";
import { BrowseRangeSection } from "./sections/BrowseRangeSection";
import { OurProductsSection } from "./sections/OurProductsSection";
import { RoomInspirationSection } from "./sections/RoomInspirationSection";
import { TestimonialsSection } from "./sections/TestimonialsSection";

export const Home = (): JSX.Element => {
  return (
    <div className="bg-white flex flex-col items-center w-full">
      <div className="bg-white w-full max-w-[1440px]">
        <HeaderSection />
        <HomeHeroSection />
        <BrowseRangeSection />
        <OurProductsSection />
        <RoomInspirationSection />
        <TestimonialsSection />
        <HomeInfoSection />
        <FooterSection />
      </div>
    </div>
  );
};