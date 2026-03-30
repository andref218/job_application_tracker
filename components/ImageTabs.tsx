"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useRef } from "react";

type Props = {
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
};

const ImageTabs = ({ activeIndex, setActiveIndex }: Props) => {
  const tabs = [
    {
      id: "organize",
      src: "/screenshots/jobApplicationTracker1.png",
      alt: "Organize Applications",
    },
    {
      id: "hired",
      src: "/screenshots/jobApplicationTracker2.png",
      alt: "Get Hired",
    },
    {
      id: "boards",
      src: "/screenshots/jobApplicationTracker3.png",
      alt: "Manage Boards",
    },
  ];

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % tabs.length);
  };

  useEffect(() => {
    intervalRef.current = setInterval(nextSlide, 4000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handleTabClick = (index: number) => {
    setActiveIndex(index);

    // reset do autoplay
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(nextSlide, 4000);
    }
  };

  return (
    <div className="relative w-full h-full overflow-hidden rounded-lg">
      {/* Slider */}
      <div
        className="flex transition-transform duration-1000 ease-in-out h-full"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {tabs.map((tab) => (
          <div key={tab.id} className="relative w-full flex-shrink-0 h-full">
            <Image
              src={tab.src}
              alt={tab.alt}
              fill
              className="object-cover object-center"
              style={{ objectPosition: "left center" }}
            />

            {/* Gradient */}
            <div
              className="absolute top-0 right-0 h-full w-1/3 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)",
              }}
            />
          </div>
        ))}
      </div>

      {/* Tab Buttons */}
      <div className="hidden sm:flex absolute bottom-4 left-1/2 -translate-x-1/2 gap-2">
        {tabs.map((tab, index) => (
          <Button
            key={tab.id}
            onClick={() => handleTabClick(index)}
            className={`rounded-lg px-5 py-2 text-sm font-medium transition-colors ${
              activeIndex === index
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {tab.alt}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ImageTabs;
