import { ChevronRightIcon } from "lucide-react";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const ContactInfoSection = (): JSX.Element => {
  return (
    <section className="w-full h-[316px] relative">
      <div className="w-full h-[328px] bg-[url(/figmaAssets/rectangle-1.png)] bg-cover bg-center relative">
        <div className="flex flex-col items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="flex flex-col items-center">
            <img
              className="w-[77px] h-[77px] object-cover mb-4"
              alt="Meubel house logo"
              src="/figmaAssets/meubel-house-logos-05-1.png"
            />
            <h1 className="font-medium text-5xl font-['Poppins',Helvetica] text-black">
              Contact
            </h1>
          </div>

          <Breadcrumb className="mt-10">
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/"
                className="font-medium text-base font-['Poppins',Helvetica] text-black"
              >
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRightIcon className="h-5 w-5" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink className="font-light text-base font-['Poppins',Helvetica] text-black">
                Contact
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </div>
      </div>
    </section>
  );
};