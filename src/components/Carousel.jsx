import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, PlayCircle, Info } from 'lucide-react';
import { useApi, Loader } from '../Importer';
import { Link } from 'react-router';


const CarouselItem = ({ item, index, isActive }) => (
  
  <div
  className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
    isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
  }`}
  >
    <img
      src={item.images?.webp?.large_image_url}
      alt={item.title}
      className="w-full md:w-[50%] absolute right-0"
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = `https://placehold.co/1200x500/202020/FFFFFF?text=Image+Not+Found&font=Inter`;
      }}
    />
    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent p-8 md:p-16 lg:p-24 flex flex-col justify-end">
      <div className="max-w-xl text-white">
        <p className="text-sm font-semibold text-pink-400 mb-1 md:mb-2">#{index+1}</p>
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-3 leading-tight">{item?.title}</h2>
        <h2 className="hidden sm:block text-sm font-poppins mb-2 md:mb-3 leading-tight">{item?.title_english}</h2>
        <p className="text-xs md:text-sm text-gray-300 mb-3 md:mb-4">{item.genres?.type}</p>
        <p className="text-sm md:text-base text-gray-200 mb-6 md:mb-8 leading-relaxed line-clamp-2">{item.synopsis}</p>
        <div className="flex space-x-3 md:space-x-4">
          <Link to={item.trailer?.url} target='blank'>
          <button className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 md:py-3 md:px-6 rounded-lg flex items-center space-x-2 transition-colors duration-300 mb-2">
            <PlayCircle size={20} />
            <span>Trailer</span>
          </button>
          </Link>
          <Link to={`/anime/${item.mal_id}`}>
          <button className="bg-gray-700/70 hover:bg-gray-600/70 text-white font-semibold py-2 px-4 md:py-3 md:px-6 rounded-lg flex items-center space-x-2 transition-colors duration-300">
            <Info size={20} />
            <span>Detail</span>
          </button>
          </Link>
        </div>
      </div>
    </div>
  </div>
  
);


const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [items, setItems] = useState([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const autoScrollInterval = 5000; // 5 seconds
  const transitionDuration = 500; // Must match CSS transition duration

  const timeoutRef = useRef(null);
  const intervalRef = useRef(null);

  const {data, loading, error} = useApi(`https://api.jikan.moe/v4/seasons/now?limit=10`)
  // console.log(data)
  // Prepare items for infinite scroll
  useEffect(() => {
    if (data?.length > 0) {
      // To make it appear infinite, we'll have a "ghost" slide at the beginning and end
      // that are clones of the last and first items respectively.
      // For a smoother visual, we only need one clone at each end for this opacity transition approach.
      setItems(data);
      setCurrentIndex(0); // Start at the first actual item
    }
  }, [data]);
  
  const resetTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, []);
  
  useEffect(() => {
    if (items.length === 0) return;
    
    resetTimeout(); // Clear existing timers

    intervalRef.current = setInterval(() => {
      handleNext();
    }, autoScrollInterval);

    return () => {
      resetTimeout(); // Cleanup on unmount
    };
  }, [items.length, currentIndex, autoScrollInterval]); // Re-run if items or currentIndex changes

  const handleNext = useCallback(() => {
    if (isTransitioning || items.length === 0) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    setTimeout(() => setIsTransitioning(false), transitionDuration);
  }, [isTransitioning, items.length]);

  const handlePrev = useCallback(() => {
    if (isTransitioning || items.length === 0) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
    setTimeout(() => setIsTransitioning(false), transitionDuration);
  }, [isTransitioning, items.length]);

  const goToSlide = (index) => {
    if (isTransitioning || items.length === 0) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), transitionDuration);
  };


  if (loading) {
    return <Loader/>;
  }

  return (
    <div className="relative w-full max-w-screen-[1920px] mx-auto h-[350px] sm:h-[400px] md:h-[500px] lg:h-[calc(100vh-100px)] max-h-[700px] overflow-hidden shadow-2xl bg-gray-900 font-poppins">
      {/* Carousel items container */}
      <div className="relative w-full h-full">
        {items.map((item, index) => (
          <CarouselItem
            key={item['mal_id']} // Ensure unique key even if items are duplicated for true infinite
            item={item}
            isActive={index === currentIndex}
            index={index}
          />
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-2 md:left-4 transform -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white p-2 md:p-3 rounded-full z-20 transition-colors duration-300"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} className="w-5 h-5 md:w-7 md:h-7" />
      </button>
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-2 md:right-4 transform -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white p-2 md:p-3 rounded-full z-20 transition-colors duration-300"
        aria-label="Next slide"
      >
        <ChevronRight size={24} className="w-5 h-5 md:w-7 md:h-7" />
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {items.map((_, index) => (
          <button
            key={`dot-${index}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
              currentIndex === index ? 'bg-pink-500 scale-125' : 'bg-gray-400/70 hover:bg-gray-200/70'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
