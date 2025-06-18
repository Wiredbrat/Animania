import React from 'react'

function Loader() {
  return (
    <div className='h-screen w-full flex justify-center items-center bg-slate-500 text-white'>
      <div 
      className="animate-spin bg-transparent border-4 rounded-[50%] border-t-slate-100 border-blue-400 text-white h-[40px] w-[40px]"
      >
      </div>
    </div>
  )
}

export default Loader