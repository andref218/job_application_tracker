"use client";

import { useEffect, useRef, useState } from "react";
import ImageTabs from "@/components/ImageTabs";
import { Button } from "@/components/ui/button";

const tabs = [
  {
    id: "organize",
    label: "Organize Applications",
  },
  {
    id: "hired",
    label: "Get Hired",
  },
  {
    id: "boards",
    label: "Manage Boards",
  },
];

export default function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % tabs.length);
  };

  // start autoplay
  useEffect(() => {
    intervalRef.current = setInterval(nextSlide, 4000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handleTabClick = (index: number) => {
    setActiveIndex(index);
    // reset autoplay
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(nextSlide, 4000);
    }
  };

  return (
    <>
      <div className="relative w-full aspect-[16/9]">
        <div className="absolute inset-0 overflow-hidden rounded-lg shadow-xl">
          <ImageTabs
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            intervalRef={intervalRef}
            nextSlide={nextSlide}
          />
        </div>
      </div>

      <div className="flex sm:hidden justify-center gap-2 mt-10">
        {tabs.map((tab, index) => (
          <Button
            key={tab.id}
            onClick={() => handleTabClick(index)}
            className={`flex-1 rounded-lg px-5 py-6 text-sm font-medium transition-colors
                whitespace-normal break-words ${
                  activeIndex === index
                    ? "bg-primary text-white"
                    : "bg-blue-200 text-gray-700 hover:bg-gray-200"
                }`}
          >
            {tab.label}
          </Button>
        ))}
      </div>
    </>
  );
}
