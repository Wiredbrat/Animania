import { useRef } from 'react'
import { Card, useApi } from '../Importer';
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from 'react-router';

function Recommendation({id}) {
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
  }

  const {data} = useApi(`https://api.jikan.moe/v4/anime/${id}/recommendations`)
  const recommendation = data;
  if(recommendation.length === 0) return
  return (
    <div className="pb-5 relative w-full">
      <h2 className='text-center bg-pink-500 text-white py-4 text-2xl mb-2'>Also Watch This</h2>
      {/* Left Button */}
      <button
        onClick={() => scroll("left")}
        className="absolute top-1/2 left-2 md:left-4 transform -translate-y-1/2 bg-black/60 hover:bg-black/90 text-white p-2 md:p-3 rounded-full z-20 transition-colors duration-300"
      >
        <ChevronLeft />
      </button>

      {/* Scrollable Container */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto space-x-3 md:space-x-4 px-2 py-5 scroll-smooth"
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

        {recommendation.map((anime) => (
        <div key={anime.entry?.['mal_id']} className='flex flex-col gap-y-1 text-white hover:scale-105 duration-300 w-[110px] md:w-[220px]'>
          <Link to={`/anime/${anime.entry?.mal_id}`}>
            <Card 
              id={anime.entry?.['mal_id']}
              bgImage={anime.entry?.images?.webp?.image_url} 
              height={"h-[150px] sm:h-[300px]"}
              width={"w-[110px] sm:w-[200px]"}
              // title={anime.title}
              />
              <span className='text-[12px] md:text-base line-clamp-1'>{anime.entry?.title}</span>
          </Link>
        </div>
      ))}
      </div>

      {/* Right Button */}
      <button
        onClick={() => scroll("right")}
         className="absolute top-1/2 right-2 md:right-4 transform -translate-y-1/2 bg-black/60 hover:bg-black/90 text-white p-2 md:p-3 rounded-full z-20 transition-colors duration-300"
      >
        <ChevronRight />
      </button>
    </div>
  )
}

export default Recommendation