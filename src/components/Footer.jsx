import React from 'react'
import { Link } from 'react-router'

function footer() {

  const alphabets = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
  
  return (
    <div className='relative flex flex-col py-6 md:py-24 text-white w-full bg-zinc-900 px-4'>

      <span className='mx-auto h-[0.1px] w-full inline-block bg-zinc-700'></span>

      <div className='px-3 my-3 flex flex-col md:flex-row md:items-center gap-1 md:gap-4 '>
        <p className='inline-block font-bold text-xl '>A-Z List </p> 
        <p className='hidden md:inline-block text-2xl font-extralight'> | </p>
        <p className='inline-block'>Search anime by alphabet name A to Z.</p>
      </div>

      <ul className='px-3 flex flex-wrap w-full gap-3 mb-4'>
        {
          alphabets.map((char, key) => {
            return (
                <Link 
                  onClick={() => window.scrollTo({
                    top: 0
                  })}
                  key={`${key}-${char}`}
                  id={`search-by-${char}`} 
                  to={`/anime/list/${char}`} 
                  className=' text-sm inline-block border py-1 px-2 rounded hover:text-blue-500 hover:scale-[1.02] hover:border-blue-500'> 
                  {char}
                </Link>
            )
          })
        }
      </ul>
      <p className='absolute bottom-1 mx-auto px-3'>
        © Animania. All rights reserved.
      </p>
    </div>
  )
}

export default footer