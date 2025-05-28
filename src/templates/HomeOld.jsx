import React, {useEffect, useRef, useState } from 'react'
import { Carousel, Card, useApi } from '../Importer'
import { Link } from 'react-router';


function RenderList({url}) {
  const {data, loading} = useApi(url)
  const animeData = data;
  if(loading) return(<div>loading...</div>)
  else return (
    <>
    
    {animeData.map((anime) => (
      <div className='w-[160px] sm:w-[230px] flex flex-col' key={anime["mal_id"]}>
          <Link to={`/anime/${anime.mal_id}`}>
          {/* {console.log(id)} */}
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
  const [section, setSection] = useState(<></>)
  return (
    <>
      
      
      <Carousel/>
      {/* <div className='searchWrapper w-full bg-[url(src/assets/searchbg.png)] bg-no-repeat bg-cover bg-center bg-fixed'>
        <div className='px-2 flex flex-col items-center justify-center h-[300px] md:h-[550px] w-full bg-black bg-opacity-35'>
        <Searchbar/>
        </div>
      </div> */}
      <div className=' h-fit w-full bg-transparent'>
        <div className='my-4 w-full bg-white grid grid-cols-4 gap-[1px] sm:gap-1'>
        
        <p className='cursor-pointer hover:text-gray-900 hover:bg-slate-100 hover:duration-500 text-sm sm:text-2xl text-center bg-black sm:font-semibold text-white font-poppins'
        onLoad={() => setSection(
          <div className='flex gap-3 sm:gap-5 w-full flex-wrap justify-center text-white'>
            <RenderList url={'https://api.jikan.moe/v4/seasons/now?limit=15'}/>
          </div>)}
        onClick={() => setSection(
          <div className='flex gap-3 sm:gap-5 w-full flex-wrap justify-center text-white'>
            <RenderList url={'https://api.jikan.moe/v4/seasons/now?limit=15'}/>
          </div>
        )}
        >
          Top Airing
        </p>

        <p className='cursor-pointer hover:text-gray-900 hover:bg-slate-100 hover:duration-500 text-sm sm:text-xl text-center bg-black sm:font-semibold text-white font-poppins '
        onClick={() => setSection(
          <div className='flex gap-5 w-full flex-wrap justify-center text-white'>
            <RenderList url={'https://api.jikan.moe/v4/top/anime?genre=action&limit=15'}/>
          </div>
        )}
        >
          
          Popular
        </p>

        <p className='cursor-pointer hover:text-gray-900 hover:bg-slate-100 hover:duration-500 text-sm sm:text-xl text-center bg-black sm:font-semibold text-white font-poppins '
        onClick={() => setSection(
          <div className='flex gap-5 w-full flex-wrap justify-center text-white'>
            <RenderList url={'https://api.jikan.moe/v4/top/anime?limit=15'}/>
          </div>
        )}
        >
          Top Ranked
        </p>
        
        <p className='cursor-pointer hover:text-gray-900 hover:bg-slate-100 hover:duration-500 text-sm sm:text-xl text-center bg-black sm:font-semibold text-white font-poppins '
        onClick={() => setSection(
          <div className='flex gap-5 w-full flex-wrap justify-center text-white'>
            <RenderList url={'https://api.jikan.moe/v4/top/anime?filter=upcoming&limit=15'}/>
          </div>
        )}
        > 
        Upcoming
        </p>
        </div>
        <div>
          {section}
        </div>
      </div>
    </>
  )
}

export default Home