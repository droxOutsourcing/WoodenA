import { ClockIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const HeroSection = (): JSX.Element => {
  // Contact information data
  const contactInfo = [
    {
      icon: <MapPinIcon className="w-[22px] h-7" />,
      title: "Address",
      details: "236 5th SE Avenue, New York NY10000, United States",
    },
    {
      icon: <PhoneIcon className="w-[30px] h-[30px]" />,
      title: "Phone",
      details: "Mobile: +(84) 546-6789\nHotline: +(84) 456-6789",
    },
    {
      icon: <ClockIcon className="w-[23px] h-[23px]" />,
      title: "Working Time",
      details: "Monday-Friday: 9:00 - 22:00\nSaturday-Sunday: 9:00 - 21:00",
    },
  ];

  // Form fields data
  const formFields = [
    {
      id: "name",
      label: "Your name",
      placeholder: "Abc",
      type: "input",
    },
    {
      id: "email",
      label: "Email address",
      placeholder: "Abc@def.com",
      type: "input",
    },
    {
      id: "subject",
      label: "Subject",
      placeholder: "This is an optional",
      type: "input",
    },
    {
      id: "message",
      label: "Message",
      placeholder: "Hi! i'd like to ask about",
      type: "textarea",
    },
  ];

  return (
    <div className="w-full py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center mb-12">
          <h2 className="font-['Poppins',Helvetica] font-semibold text-black text-4xl mb-4">
            Get In Touch With Us
          </h2>
          <p className="font-['Poppins',Helvetica] font-normal text-[#9f9f9f] text-base text-center max-w-2xl">
            For More Information About Our Product &amp; Services. Please Feel
            Free To Drop Us An Email. Our Staff Always Be There To Help You Out.
            Do Not Hesitate!
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 justify-between">
          {/* Contact Information Card */}
          <Card className="w-full lg:w-[405px] border-none shadow-none">
            <CardContent className="p-6">
              <div className="space-y-12">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start gap-6">
                    <div className="mt-1">{item.icon}</div>
                    <div>
                      <h3 className="font-['Poppins',Helvetica] font-medium text-black text-2xl mb-2">
                        {item.title}
                      </h3>
                      <p className="font-['Poppins',Helvetica] font-normal text-black text-base max-w-[212px] whitespace-pre-line">
                        {item.details}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Contact Form Card */}
          <Card className="w-full lg:w-[635px] border-none shadow-none">
            <CardContent className="p-6">
              <div className="max-w-[533px] mx-auto space-y-8">
                {formFields.map((field) => (
                  <div key={field.id} className="space-y-2">
                    <label
                      htmlFor={field.id}
                      className="font-['Poppins',Helvetica] font-medium text-black text-base block"
                    >
                      {field.label}
                    </label>
                    {field.type === "input" ? (
                      <Input
                        id={field.id}
                        placeholder={field.placeholder}
                        className="h-[75px] rounded-[10px] border-[#9f9f9f] px-7 py-6 font-['Poppins',Helvetica]"
                      />
                    ) : (
                      <Textarea
                        id={field.id}
                        placeholder={field.placeholder}
                        className="h-[120px] rounded-[10px] border-[#9f9f9f] px-7 py-6 font-['Poppins',Helvetica]"
                      />
                    )}
                  </div>
                ))}

                <Button className="w-[237px] h-[55px] bg-[#b88e2f] hover:bg-[#a17a29] text-white rounded-[5px] font-['Poppins',Helvetica] font-normal text-base">
                  Submit
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
