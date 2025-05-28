import {useState, useEffect} from 'react'
import ReactPaginate from 'react-paginate';


function Pagination({lastVisiblePage, parentData, onPageChange, page}) {

  const [pageCount, setPageCount] = useState(0);
  

  useEffect(() => {
    setPageCount(lastVisiblePage);
  }, [parentData]);

  return (
    <>
     <div className='flex w-full justify-center my-6'>
        <ReactPaginate
          breakLabel='...'
          nextLabel='Next >'
          onPageChange={event => onPageChange(event.selected + 1)}
          pageRangeDisplayed={5}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel='< Prev'
          forcePage={page - 1}
          containerClassName='pagination flex flex-wrap px-2 justify-center gap-2 text-white'
          activeLinkClassName='font-bold text-blue-400'
          pageLinkClassName='px-3 py-1 border border-gray-500 rounded hover:bg-blue-500 transition'
          previousLinkClassName='px-3 py-1 border border-gray-500 rounded hover:bg-blue-500 transition'
          nextLinkClassName='px-3 py-1 border border-gray-500 rounded hover:bg-blue-500 transition'
          breakLinkClassName='px-3 py-1 border border-gray-500 rounded hover:bg-blue-500 transition'
        />
      </div>
    </>
  )
}

export default Pagination