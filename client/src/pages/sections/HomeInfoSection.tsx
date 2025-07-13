import React from "react";

export const HomeInfoSection = (): JSX.Element => {
  return (
    <section className="w-full py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-['Poppins',Helvetica] font-bold text-black text-4xl mb-4">
            Browse The Range
          </h2>
          <p className="font-['Poppins',Helvetica] font-normal text-[#666666] text-xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Dining */}
          <div className="text-center">
            <div className="bg-gray-200 h-[480px] rounded-lg mb-6 flex items-center justify-center">
              <span className="text-gray-500">Dining Image</span>
            </div>
            <h3 className="font-['Poppins',Helvetica] font-semibold text-black text-2xl">
              Dining
            </h3>
          </div>

          {/* Living */}
          <div className="text-center">
            <div className="bg-gray-200 h-[480px] rounded-lg mb-6 flex items-center justify-center">
              <span className="text-gray-500">Living Image</span>
            </div>
            <h3 className="font-['Poppins',Helvetica] font-semibold text-black text-2xl">
              Living
            </h3>
          </div>

          {/* Bedroom */}
          <div className="text-center">
            <div className="bg-gray-200 h-[480px] rounded-lg mb-6 flex items-center justify-center">
              <span className="text-gray-500">Bedroom Image</span>
            </div>
            <h3 className="font-['Poppins',Helvetica] font-semibold text-black text-2xl">
              Bedroom
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
};