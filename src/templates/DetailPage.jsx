import React from 'react'
import { Button, Card, useApi, Characters, Recommendation, Loader } from '../Importer'
import { useParams } from 'react-router'


function DetailPage() {
  const {id_num} = useParams()
  const {data, loading, error} = useApi(`https://api.jikan.moe/v4/anime/${id_num}`)
   

  if (loading) return <Loader/>
  if (error) return <p className='h-screen w-full flex justify-center items-center bg-slate-500 text-red-500'>something went wrong</p>
  return (
    <>
      <section className={` h-max w-full text-white bg-[url(frontend/src/assets/shoto_todoroki.jpg)] bg-cover`}>
        <div className={`pt-[60px] pb-[20px] sm:py-[70px] md:py-[100px] w-full bg-black bg-opacity-70 backdrop-blur-sm flex justify-center items-center`}>
          <div className='flex flex-wrap md:flex-nowrap flex-col sm:flex-row gap-4 md:gap-8 justify-center items-center sm:items-start md:flex-1'>

            <Card 
            height={`h-[250px] sm:h-auto`} 
            width={`w-[auto] sm:w-[auto] xl:w-[auto]`} 
            bgImage={data?.images?.webp?.image_url} />

            <div className='details w-[95%] sm:w-[60%] xl:w-[70%] h-autotext-center md:text-left sm:self-start flex flex-col gap-y-3'>

              <h2 className='anime-title text-[18px] md:text-2xl font-semibold text-center sm:text-left '>
                {data?.title_english !== null ? data?.title_english : data?.title}
              </h2>
              
              <div className='tags w-full text-center sm:text-left mb-2'>
                <span className='bg-green-600 py-1 px-4 rounded-lg text-sm md:text-base inline-flex mt-2 '>
                  {data?.score}
                </span>
                <span className=' px-4 md:text-xl'>
                  {data?.type}
                </span>
                
                <br/>
                <span className='bg-red-500 py-1 px-2 rounded-lg text-sm md:text-base inline-flex mt-2 '>
                  {data?.rating}
                </span>
              </div>

              <p className='description text-justify sm:text-left px-2 md:pe-4'>
                {data?.synopsis}
              </p>

              <div className='genre-tags'>
                {data?.genres?.map(((genre,index) => <div key={index} className='bg-green-500 py-1 px-2 mx-1 rounded-lg text-sm md:text-base inline-flex mb-2'>{genre.name}</div>))}
              </div>

              <div className='related-buttons w-max'>
                <Button link={data?.trailer?.url}/>
              </div>

            </div>
          </div>
        </div>
      </section>
      <section className=' bg-neutral-900 w-full'>
      <div className=''>
        
        <Recommendation id={id_num}/>
      </div>
      </section>
      <section className='pb-5 character-cards bg-neutral-900 bg-opacity-90 w-full'>
        <h2 className='text-center bg-pink-500 text-white py-4 text-2xl mb-12'>Characters</h2>
        <Characters charId={id_num}/>
      </section>
     
    </>
  )
}

export default DetailPage