import React, { useState, useEffect, useContext } from 'react';
import { Card, useApi ,Pagination, Loader} from '../Importer';
import { Link } from 'react-router';
import AnimeContext from '../context/AnimeContext';
import ReactPaginate from 'react-paginate';
import { motion } from 'framer-motion';

function List() {
  // const { id, setId } = useContext(AnimeContext);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const { data, loading, error, parentData } = useApi(`https://api.jikan.moe/v4/anime?page=${page}`);

  useEffect(() => {
    setPageCount(parentData.pagination?.last_visible_page || 0);
  }, [parentData]);

  const handlePageClick = (event) => {
    const selectedPage = event.selected + 1;
    setPage(selectedPage);
  };

  if (loading) return <Loader/>

  if (error)
    return (
      <p className='h-screen w-full flex justify-center items-center bg-slate-500 text-red-500'>
        something went wrong
      </p>
    );

  return (
    <>
      <motion.div
      initial={{opacity: 0}}
      whileInView={{
        opacity: 1,
        transition: {duration: 1}
      }}
      className='pt-[90px] h-auto w-full flex flex-wrap justify-center bg-slate-800 gap-4 text-white'>
        {data?.map((anime) => (
          <div className='w-[100px] sm:w-[230px] flex flex-col' key={anime["mal_id"]}>
            <Link to={`/anime/${anime.mal_id}`}>
              <Card
                bgImage={anime.images?.jpg?.image_url}
                height={'h-[150px] sm:h-[300px]'}
                width={'w-[110px] sm:w-[230px]'}
                tags={anime.genres[0]?.name}
                id={anime["mal_id"]}
              />
              <span className='text-[12px] md:text-base line-clamp-1 transi'>
                {anime.titles[0]?.title}
              </span>
            </Link>
          </div>
        ))}
      </motion.div>

      {/* <div className='w-full flex justify-center my-6'>
        <ReactPaginate
          breakLabel='...'
          nextLabel='Next >'
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel='< Prev'
          forcePage={page - 1}
          containerClassName='pagination flex gap-2 text-white'
          activeLinkClassName='font-bold text-blue-400'
          pageLinkClassName='px-3 py-1 border border-gray-500 rounded hover:bg-blue-500 transition'
          previousLinkClassName='px-3 py-1 border border-gray-500 rounded hover:bg-blue-500 transition'
          nextLinkClassName='px-3 py-1 border border-gray-500 rounded hover:bg-blue-500 transition'
          breakLinkClassName='px-3 py-1 border border-gray-500 rounded hover:bg-blue-500 transition'
        />
      </div> */}
      <Pagination parentData={parentData} 
      lastVisiblePage={parentData.pagination?.last_visible_page || 0}
      page={page}
      onPageChange={(newpage) => setPage(newpage)}
      />
    </>
  );
}

export default List;