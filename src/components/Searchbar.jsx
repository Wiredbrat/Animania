import { Search } from 'lucide-react';
import { useState, useEffect} from 'react'
import { Link } from 'react-router';
// import { debounce } from 'lodash';
function Searchbar({display, hidden}) {
  // const searchInput = useRef()
  const [searchResult, setSearchResult] = useState (<></>) 
  const [query, setQuery] = useState('')
  // const [hidden, setHidden] = (true)

  // function debounced(fn, delay) {
  //   let timer; 
  //   return (...args) => {
  //     clearTimeout(timer);
  //     timer = setTimeout(() => fn(...args), delay)
  //   }
  // }

 
  const searchFn = async() => {
    try{
      const response = await fetch(`https://api.jikan.moe/v4/anime?q=${query}&limit=15`)
      const data = await response.json()
      const results = data.data
    if(query.trim() === ''){
      setSearchResult(<></>)
      return
    }

    if(results.length !== 0) {
      // console.log(results)
      setSearchResult(
      results.map((item) => 
      <div key={item.mal_id}>
        <Link to={`/anime/${item.mal_id}`} >
        <div className='flex gap-3 mt-1 bg-gray-900 mx-auto bg-opacity-30 h-max max-w-screen-md w-[98%] py-3 px-4 list-none rounded-lg border border-gray-400 text-white backdrop-blur-sm hover:scale-[1.01] hover:duration-300' >
        <img src={item.images?.webp?.image_url} alt="" className='w-10'/>
        <div>
        <p className='line-clamp-1'>{item.title}</p>
        {item.type !== null && <span className='bg-red-500 px-2 py-[1px] text-sm'>{item.type}</span>}
        </div>
        </div>
        </Link>
      </div>
    ))}
    else{
      setSearchResult(<div className='my-1 bg-gray-900 mx-auto bg-opacity-30 h-max max-w-screen-md w-[98%] py-3 px-4 list-none rounded-lg border border-gray-400 text-white text-center'>This anime doesn't exist yet.</div>)
    }
    }catch(error) {
      console.error('error', error)
    }
    
  }
  
  // const searching = debounced(searchFn(), 2000)


  return (
    <>
    <div className={`w-screen h-screen z-[99999] fixed ${display} duration-300 backdrop-blur-[6px] backdrop-brightness-50 `}
    onClick={() => {
      hidden()
      setQuery('')
      if(query === '') {searchFn()}
    }}
    >
    </div>
    <div className={`fixed ${display} z-[999999] px-3 max-w-screen-sm w-full flex-col items-center justify-center left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]`}>

      <div className={` max-w-screen-sm w-full ps-4 pe-3 py-1 rounded-xl bg-gray-200 flex gap-3 justify-center items-center shadow-lg `}>
        <input
          value={query}
          type='text'
          placeholder='One Piece...'
          onChange={(e) => {
            setQuery(e.target.value);
            // searching();
            
          }} 
          onKeyDown={(e) => e.key === 'Enter' && searchFn()}
          className='py-2 text-xl font-mono outline-none bg-transparent text-black w-full'
          />
        
        {/* <Link to={`/search?${searchInput.current?.value}`} > */}
        <span
          className='inline-flex w-10 aspect-square p-[8px] cursor-pointer hover:bg-[#5151511a] hover:duration-900 rounded-xl'
          onClick={searchFn}
          >
          {/* <img src='src/assets/search-analytics.png' className='' alt="searchbtn" /> */}
          <Search/>
        </span>
        {/* </Link> */}
      </div>
      <div 
      className='max-h-80 overflow-y-scroll [&::-webkit-scrollbar]:w-[3px] [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-900 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white [&::-webkit-scrollbar-track]:py-2 flex flex-col bg-transparent h-[auto] max-w-screen-sm w-full rounded-xl gap-[2px]'
      onClick={() => {
        hidden();
        setQuery('')
        if(query === '') {searchFn()}
      }}
      >{searchResult}</div>
      </div>
    
    </>
  )
}

export default Searchbar