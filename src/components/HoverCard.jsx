import React, { useState } from 'react'
import { motion } from 'framer-motion'

export function HoverCard({height, width, bgImage, tags, moreTags, id, title, onClick, hover}) {
  const [isHover, setIsHover] = useState(false);
  
  return (
    <div 
      className={` ${hover} w-[125%] z-[100000] h-[100%] p-4 absolute -translate-x-1/2 translate-y-1/2 -right-[100%] -top-[50%] backdrop-blur-sm backdrop-filter bg-slate-700 bg-opacity-50 rounded-lg flex`}
      onClick={onClick}
    >    
      <li key={id} className='w-full text-lg font-bold px-2 sm:text-base list-none line-clamp-2'> {title}</li>  
      <span 
      className={`${ tags === undefined ? 'hidden':'py-[2px] px-1 bg-red-500 rounded-md absolute top-2 left-2 text-[10px] md:text-base'} ${tags}`}> {/* the 'tags' variable hold any value of display property i.e., block hidden flex etc..*/}
        {tags}
      </span>
      <span 
      className={`${ moreTags === undefined ? 'hidden':'py-[2px] px-1 bg-green-500 rounded-md absolute top-5 left-2 text-sm md:text-base'} ${tags}`}> {/* the 'tags' variable hold any value of display property i.e., block hidden flex etc..*/}
        {moreTags}
      </span>
    </div>
  )
}