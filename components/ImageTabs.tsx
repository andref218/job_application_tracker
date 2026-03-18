"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

const ImageTabs = () => {
  const [activeTab, setActiveTab] = useState("organize"); // organize, hired, boards
  return (
    <section className="border-t bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <div className="flex gap-2 justify-center mb-8">
            <Button
              onClick={() => setActiveTab("organize")}
              className={`rounded-lg px-5 py-3 text-sm font-medium transition-colors 
                    ${
                      activeTab === "organize"
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
            >
              Organize Applications
            </Button>
            <Button
              onClick={() => setActiveTab("hired")}
              className={`rounded-lg px-5 py-3 text-sm font-medium transition-colors 
                    ${
                      activeTab === "hired"
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
            >
              Get Hired
            </Button>{" "}
            <Button
              onClick={() => setActiveTab("boards")}
              className={`rounded-lg px-5 py-3 text-sm font-medium transition-colors 
                    ${
                      activeTab === "boards"
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
            >
              Manage Boards
            </Button>
          </div>
          {/* TODO: Render hero images based on selected button */}
          {/*<Image />
              <Image />
              <Image /> 
              */}
        </div>
      </div>
    </section>
  );
};

export default ImageTabs;
