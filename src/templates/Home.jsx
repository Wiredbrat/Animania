import React, {useEffect, useRef, useState } from 'react'
import { Carousel, Card, useApi, Loader } from '../Importer'
import { Link } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion'

const menuOptions = [
  {
    title: 'Top Airing',
    url: 'https://api.jikan.moe/v4/seasons/now?limit=15'
  },
  {
    title: 'Top Movies',
    url: 'https://api.jikan.moe/v4/top/anime?filter=bypopularity&type=movie&limit=15'
  },
  {
    title: 'Top Ranked',
    url: 'https://api.jikan.moe/v4/top/anime?limit=15'
  },
  {
    title: 'Upcoming',
    url: 'https://api.jikan.moe/v4/top/anime?filter=upcoming&limit=15'
  }
]

function RenderList({url}) {
  const {data, loading} = useApi(url)
  const animeData = data || [];
  if(loading) <Loader/>
  else return (
    <>
    
    {animeData.map((anime) => (
      <div className='w-[110px] sm:w-[230px] flex flex-col' key={anime["mal_id"]}
      >
         <Link to={`/anime/${anime.mal_id}`}>
          <Card 
          // onClick={setId(anime.mal_id)}
          bgImage={anime.images?.webp?.image_url}
          height={"h-[150px] sm:h-[300px]"}
          width={"w-[110px] sm:w-[230px]"}
          tags={anime.genres[0]?.name}
          id={anime["mal_id"]}
          // title={anime.titles[0].title}
          />
          <span className='text-[12px] md:text-base line-clamp-1'>{anime.titles[0]?.title}</span>
          </Link>
        
      </div>
    ))}
  </>
  );
}



function Home() {
  const [activeIndex, setActiveIndex] = useState(0)



  return (
    <>
      
      
      <Carousel/>
      
      <div className='min-h-screen pb-4 sm:pb-10 w-full bg-transparent'>
        {/* MENU */}
        <div className='sm:mt-8 sm:mb-8 w-full gap-[1px] flex justify-center sm:m-0 sm:gap-1'>
          {menuOptions.map((item, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`text-sm sm:text-xl text-center font-poppins font-semibold px-[6px] sm:px-5 py-5 transition duration-300 ${
                activeIndex === index
                  ? ' text-white  underline underline-offset-[10px]'
                  : ' text-white hover:text-blue-500'
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>

        {/* RENDER ANIME SECTION */}
        <div className='flex gap-1 sm:gap-5 w-full flex-wrap justify-center text-white'>
         <AnimatePresence mode='wait'>
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className='flex gap-3 sm:gap-5 w-full flex-wrap justify-center line-clamp-1 text-white'
            >
              <RenderList url={menuOptions[activeIndex].url} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </>
  )
}

export default Home
