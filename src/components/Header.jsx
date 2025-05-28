import React, { useState, useRef } from 'react'
import { Link, NavLink } from 'react-router'
import Searchbar from './Searchbar'
import { MenuIcon } from 'lucide-react'

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
            <img src='src/assets/search-icon.png' className='invert h-4 md:h-[22px] aspect-square' alt="search icon"/>
          </span>
          <span className="hidden md:inline-flex p-3 self-center invert hover:bg-[#dadada2b] hover:duration-900 rounded-full duration-200">
            <a href="https://github.com/wiredbrat" target='_blank'>
              <img src="src/assets/github.svg" alt="Github icon" className="h-7" />
            </a>
          </span>
          <span className='md:hidden invert flex justify-center items-center'>
            <MenuIcon 
            onClick={() => setShowMenu((prev) => !prev)}/>
          </span>
        </div>
      </div>
      

      <div ref={mobileMenu} className={`${showMenu ? 'translate-x-[0%]' : 'translate-x-[-100%]'} mobileMenu h-screen w-[50%] bg-gray-500/30 backdrop-blur-lg duration-500 z-[99999] fixed left-0 md:hidden grid grid-rows-2 shadow-md`}
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
        <span className="md:hidden inline-flex hover:bg-[#dadada2b] hover:duration-900 rounded-full duration-200 absolute bottom-2 left-6">
          <a href="https://github.com/wiredbrat" target='_blank'>
            <img src="src/assets/github.svg" alt="Github icon" className="h-7" />
          </a>  
        </span>
        <span className='text-[12px] absolute bottom-0 right-2'>
          made by WiredBrat
        </span>
      </div>
      {/* <div className="pt-20 bg-slate-800 text-center text-2xl">
        sss
      </div> */}
    </>
  )
}

export default Header