import React, { useState, useRef } from 'react'
import { Link, NavLink } from 'react-router'
import Searchbar from './Searchbar'
import { MenuIcon, SearchIcon } from 'lucide-react'

function Header() {

  const [search, setSearch] = useState('hidden')
  const mobileMenu = useRef()
  const [showMenu, setShowMenu] = useState(false)

  function hideSearchElement() {
    setSearch('hidden');
  }

  function showSearchElement() {
    setSearch('flex')
  }



  return (
    <>
      
      <Searchbar display={search} hidden={hideSearchElement}/>
      <div className="grid grid-cols-2 md:grid-cols-3 justify-between items-center w-full h-[50px] md:h-[80px] px-2 md:px-8 bg-slate-800 bg-opacity-20 backdrop-blur-md backdrop-filter fixed z-[2000] ">
        <span className='w-fit'>
          <Link to='/' className='text-white font-mono font-semibold text-sm xl:text-xl'>
            <span className='rotate-[15deg] inline-block'>A</span>niMani<span className='rotate-[-15deg] inline-block'>A</span>
            {/* <img className='' src="src/assets/disney-logo.png" alt="Logo" width={50} /> */}
          </Link>
        </span>
        <ul className="hidden md:flex gap-4 sm:gap-8 text-sm md:text-lg font-light m-auto ">
          <NavLink to='/' className={({isActive}) => `hover:text-blue-500 hover:duration-200 ${isActive? 'text-blue-500': 'text-white'}`}>
            <li className="cursor-pointer">Home</li>
          </NavLink>

          <li className="cursor-pointer group relative ">
            {/* <NavLink to=''  className={({isActive}) => `hover:delay-150 hover:text-blue-500 hover:duration-200 ${isActive? 'text-blue-500': 'text-white'}`}> */}
              <span className='inline-flex items-center text-white'>
                Anime 
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down group-hover:rotate-180 group-hover:delay-200 duration-500"><path d="m6 9 6 6 6-6"></path></svg>
              </span>
            <ul style={{interpolateSize: 'allow-keywords'}} 
            className='overflow-hidden border-0 rounded-xl w-[400%] group-hover:text-white group-hover:delay-200 translate-x-[-50%] bg-slate-900 bg-opacity-50 h-0 group-hover:h-[auto] gap-1 absolute left-1/2 duration-500 flex justify-center items-center flex-col'>
              <NavLink to={`/anime/airing`} className={({isActive}) => `hover:delay-150 hover:text-blue-500 hover:duration-200 ${isActive? 'text-blue-500': 'text-white'}`}>
                <li className='hover:text-blue-500'>Airing</li>
              </NavLink>
              <NavLink to={`/anime/trending`} className={({isActive}) => `hover:delay-150 hover:text-blue-500 hover:duration-200 ${isActive? 'text-blue-500': 'text-white'}`}>
                <li className='hover:text-blue-500'>Trending</li>
              </NavLink>
              <NavLink to={`/anime/popular`} className={({isActive}) => `hover:delay-150 hover:text-blue-500 hover:duration-200 ${isActive? 'text-blue-500': 'text-white'}`}>
                <li className='hover:text-blue-500'>Most Popular</li>
              </NavLink>
              <NavLink to={`/anime/top-rated`} className={({isActive}) => `hover:delay-150 hover:text-blue-500 hover:duration-200 ${isActive? 'text-blue-500': 'text-white'}`}>
                <li className='hover:text-blue-500'>Top Ranking</li>
              </NavLink>
              <NavLink to={`/anime/top-movies`} className={({isActive}) => `hover:delay-150 hover:text-blue-500 hover:duration-200 ${isActive? 'text-blue-500': 'text-white'}`}>
                <li className='hover:text-blue-500'>Top Movies</li>
              </NavLink>
              <NavLink to={`/anime/upcoming-anime`} className={({isActive}) => `hover:delay-150 hover:text-blue-500 hover:duration-200 ${isActive? 'text-blue-500': 'text-white'}`}>
                <li className='hover:text-blue-500'>Upcoming Anime</li>
              </NavLink>
              
            </ul>
            {/* </NavLink> */}
          </li>
          <NavLink to='/more' className={({isActive}) => `hover:text-blue-500 hover:duration-200 ${isActive? 'text-blue-500 bb': 'text-white'}`}>
            <li className="cursor-pointer">More</li>
          </NavLink>
        </ul>

        <div className="grid gap-3 grid-flow-col ms-auto">
          <span 
          className='inline-flex self-center p-3 cursor-pointer hover:bg-[#0000002b] hover:duration-900 rounded-full duration-200'
          onClick={showSearchElement}
          >
            <SearchIcon className='invert h-5 sm:h-8 md:h-[22px] aspect-square' alt="search icon"/>
          </span>
          <span className="hidden md:inline-flex p-3 self-center invert hover:bg-[#dadada2b] hover:duration-900 rounded-full duration-200">
            <a href="https://github.com/wiredbrat" target='_blank'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" alt="Github icon" className="h-7" ><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/></svg>
            </a>
          </span>
          <span className='md:hidden invert flex justify-center items-center'>
            <MenuIcon className={`${showMenu ? 'text-red-400': 'text-black'}`} 
            onClick={() => {setShowMenu((prev) => !prev)
            }}/>
          </span>
        </div>
      </div>
      
      <div 
      ref={mobileMenu} 
      className={`${showMenu ? 'translate-x-[0%]' : 'translate-x-[-100%]'} w-[100%] h-screen bg-transparent fixed left-0 md:hidden grid z-[99999] duration-500  `}
      onClick={() => setShowMenu((prev) => !prev)}
      >

      <div 
      ref={mobileMenu} 
      className={`${showMenu ? 'translate-x-[0%]' : 'translate-x-[-100%]'} mobileMenu h-screen w-[50%] bg-gray-500/30 backdrop-blur-lg duration-500 z-[99999] fixed left-0 md:hidden grid grid-rows-2 shadow-lg shadow-black`}
      onClick={() => setShowMenu((prev) => !prev)}
      >
      

        <ul className="flex flex-col items-start gap-2 sm:gap-8 text-sm md:text-lg font-light m-auto ">
          <NavLink to='/' className={({isActive}) => `hover:text-blue-500 hover:duration-200 ${isActive? 'text-blue-500': 'text-white'}`}>
            <li className="cursor-pointer">Home</li>
          </NavLink>
             
          <NavLink to={`/anime/airing`} className={({isActive}) => `hover:delay-150 hover:text-blue-500 hover:duration-200 ${isActive? 'text-blue-500': 'text-white'}`}>
            <li className='hover:text-blue-500'>Airing</li>
          </NavLink>
          <NavLink to={`/anime/trending`} className={({isActive}) => `hover:delay-150 hover:text-blue-500 hover:duration-200 ${isActive? 'text-blue-500': 'text-white'}`}>
            <li className='hover:text-blue-500'>Trending</li>
          </NavLink>
          <NavLink to={`/anime/popular`} className={({isActive}) => `hover:delay-150 hover:text-blue-500 hover:duration-200 ${isActive? 'text-blue-500': 'text-white'}`}>
            <li className='hover:text-blue-500'>Most Popular</li>
          </NavLink>
          <NavLink to={`/anime/top-rated`} className={({isActive}) => `hover:delay-150 hover:text-blue-500 hover:duration-200 ${isActive? 'text-blue-500': 'text-white'}`}>
            <li className='hover:text-blue-500'>Top Ranking</li>
          </NavLink>
          <NavLink to={`/anime/top-movies`} className={({isActive}) => `hover:delay-150 hover:text-blue-500 hover:duration-200 ${isActive? 'text-blue-500': 'text-white'}`}>
            <li className='hover:text-blue-500'>Top Movies</li>
          </NavLink>
          <NavLink to={`/anime/upcoming-anime`} className={({isActive}) => `hover:delay-150 hover:text-blue-500 hover:duration-200 ${isActive? 'text-blue-500': 'text-white'}`}>
            <li className='hover:text-blue-500'>Upcoming</li>
          </NavLink>
          <NavLink to='/more' className={({isActive}) => `hover:text-blue-500 hover:duration-200 ${isActive? 'text-blue-500 bb': 'text-white'}`}>
            <li className="cursor-pointer">More</li>
          </NavLink>
        </ul> 
        <span className="md:hidden inline-flex hover:bg-[#dadada2b] hover:duration-900 rounded-full duration-200 absolute bottom-2 left-3">
          <a href="https://github.com/wiredbrat" target='_blank'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" alt="Github icon" className="h-7 invert" ><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/></svg>
          </a>  
        </span>
        {/* <span className='text-[12px] absolute bottom-0 right-2'>
          made by WiredBrat
        </span> */}
      </div>
      </div>
      {/* <div className="pt-20 bg-slate-800 text-center text-2xl">
        sss
      </div> */}
    </>
  )
}

export default Header
