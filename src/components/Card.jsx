import React from 'react'
import { motion } from 'framer-motion'

function Card({height, width, bgImage, tags, moreTags, id, title, onClick, hover}) {
  return (
    <motion.div 
    className={`${height} ${width} ${hover}  bg-slate-700 relative rounded-xl flex overflow-clip`}
    onClick={onClick}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.4 }}
    viewport={{ once: true }}
    >
      <img src={`${bgImage}`} loading='lazy' alt={'image will go here'} className={`${height} ${width} object-fill `}/>
      
      <span 
      className={`${ tags === undefined ? 'hidden':'py-[2px] px-1 bg-red-500 rounded-md absolute top-2 left-2 text-[10px] md:text-base'} ${tags}`}> {/* the 'tags' variable hold any value of display property i.e., block hidden flex etc..*/}
        {tags}
      </span>
      <span 
      className={`${ moreTags === undefined ? 'hidden':'py-[2px] px-1 bg-green-500 rounded-md absolute top-5 left-2 text-sm md:text-base'} ${tags}`}> {/* the 'tags' variable hold any value of display property i.e., block hidden flex etc..*/}
        {moreTags}
      </span>
      <li key={id} className='w-full text-sm px-2 sm:text-base list-none absolute bottom-0 bg-gradient-to-b from-[#78787800] to-[#5a5a5a] bg-opacity-25'> {title}</li>

    </motion.div>
  )
}

export default Card