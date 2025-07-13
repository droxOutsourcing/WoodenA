import React from "react";
import { ContactFormSection } from "./sections/ContactFormSection";
import { FooterSection } from "./sections/FooterSection";
import { HeaderSection } from "./sections/HeaderSection";
import { HeroSection } from "./sections/HeroSection";
import { ContactInfoSection } from "./sections/ContactInfoSection";

export const Contact = (): JSX.Element => {
  return (
    <div className="bg-white flex flex-col items-center w-full">
      <div className="bg-white w-full max-w-[1440px]">
        <HeaderSection />
        <ContactInfoSection />
        <HeroSection />
        <ContactFormSection />
        <FooterSection />
      </div>
    </div>
  );
};
