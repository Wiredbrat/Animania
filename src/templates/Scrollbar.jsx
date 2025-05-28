import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const HorizontalScrollSection = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      const scrollAmount = current.offsetWidth / 1.5;
      current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative w-full">
      {/* Left Button */}
      <button
        onClick={() => scroll("left")}
        className="absolute top-1/2 left-2 md:left-4 transform -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white p-2 md:p-3 rounded-full z-20 transition-colors duration-300"
        aria-label="Previous slide"
      >
        <ChevronLeft />
      </button>

      {/* Scrollable Container */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto space-x-4 p-4 scroll-smooth"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {/* Hide scrollbar (for Firefox + Edge) */}
        <style>
          {`
            div::-webkit-scrollbar {
              display: none;
            }
          `}
        </style>

        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="min-w-[200px] h-40 bg-blue-500 rounded flex items-center justify-center text-white text-xl"
          >
            Item {i + 1}
          </div>
        ))}
      </div>

      {/* Right Button */}
      <button
        onClick={() => scroll("right")}
        className="absolute top-1/2 left-2 md:left-4 transform -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white p-2 md:p-3 rounded-full z-20 transition-colors duration-300"
        aria-label="next slide"
      >
        <ChevronRight />
      </button>
    </div>
  );
};

export default HorizontalScrollSection;
