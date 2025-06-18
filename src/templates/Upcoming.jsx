import { useState } from 'react';
import { Card, useApi, Pagination, Loader} from '../Importer';

import { Link } from 'react-router'

function Upcoming() {
  const [page, setPage] = useState(1)
  const {data, loading, error, parentData} = useApi(`https://api.jikan.moe/v4/top/anime?filter=upcoming&page=${page}`)

  if (loading) return <Loader/>
  if (error) return <p className='h-screen w-full flex justify-center items-center bg-slate-500 text-red-500'>something went wrong</p>
  return (
    <>
      <div className='pt-[50px] md:pt-[90px] h-auto w-full flex flex-wrap justify-center bg-slate-800 gap-4 text-white'>
        <h2 className='text-center bg-pink-500 text-white py-4 md:text-2xl mb-2 w-full text-base'>Upcoming Anime</h2>
       { 
       data?.map((anime) => (
        <div className={`${anime.genres[0]?.name === "Hentai" && 'hidden'} w-[100px] sm:w-[230px] flex flex-col hover:scale-105 duration-300`} key={anime["mal_id"]}>
          <Link to={`/anime/${anime.mal_id}`}>
          {/* {console.log(id)} */}
          <Card 
          // onClick={setId(anime.mal_id)}
          bgImage={anime?.images?.jpg?.image_url}
          height={"h-[150px] sm:h-[300px]"}
          width={"w-[110px] sm:w-[230px]"}
          tags={anime.genres[0]?.name}
          id={anime["mal_id"]}
          // title={anime.titles[0]?.title}
          />
          <span className='text-[12px] md:text-base line-clamp-1'>{anime.titles[0]?.title}</span>
          </Link>
        
        </div>
       ))
       }
      </div>
      <Pagination parentData={parentData} 
      lastVisiblePage={parentData.pagination?.last_visible_page || 0}
      page={page}
      onPageChange={(newpage) => setPage(newpage)}
      />
    </>
  )
}

export default Upcoming