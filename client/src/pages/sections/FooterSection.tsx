import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const FooterSection = (): JSX.Element => {
  // Footer navigation links data
  const linkColumns = [
    {
      title: "Links",
      links: ["Home", "Shop", "About", "Contact"],
    },
    {
      title: "Help",
      links: ["Payment Options", "Returns", "Privacy Policies"],
    },
  ];

  return (
    <footer className="w-full border-t border-[#0000002b] bg-white py-12">
      <div className="mx-auto max-w-[1240px] px-4">
        {/* Main footer content */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4">
          {/* Logo and address */}
          <div className="space-y-6">
            <h2 className="font-['Poppins',Helvetica] text-2xl font-bold tracking-normal text-black">
              WoodenA.
            </h2>
            <p className="font-['Poppins',Helvetica] text-base font-normal tracking-normal text-[#9f9f9f]">
              400 University Drive Suite 200 Coral <br />
              Gables, FL 33134 USA
            </p>
          </div>

          {/* Navigation links */}
          {linkColumns.map((column, index) => (
            <div key={`column-${index}`} className="space-y-6">
              <h3 className="font-['Poppins',Helvetica] text-base font-medium tracking-normal text-[#9f9f9f]">
                {column.title}
              </h3>
              <ul className="space-y-4">
                {column.links.map((link, linkIndex) => (
                  <li key={`link-${linkIndex}`}>
                    <a
                      href="#"
                      className="font-['Poppins',Helvetica] text-base font-medium tracking-normal text-black hover:underline"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div className="space-y-6">
            <h3 className="font-['Poppins',Helvetica] text-base font-medium tracking-normal text-[#9f9f9f]">
              Newsletter
            </h3>
            <div className="space-y-2">
              <div className="flex items-end space-x-2">
                <div className="flex-1">
                  <p className="mb-1 font-['Poppins',Helvetica] text-sm font-normal text-[#9f9f9f]">
                    Enter Your Email Address
                  </p>
                  <Separator className="h-px w-full bg-[#9f9f9f]" />
                </div>
                <div>
                  <Button
                    variant="link"
                    className="h-auto p-0 font-['Poppins',Helvetica] text-sm font-medium text-black"
                  >
                    SUBSCRIBE
                  </Button>
                  <Separator className="h-px w-full bg-black" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="mt-16">
          <Separator className="h-px w-full" />
          <p className="mt-6 font-['Poppins',Helvetica] text-base font-normal tracking-normal text-black">
            2023 <span className="font-bold">WoodenA</span>. All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};
