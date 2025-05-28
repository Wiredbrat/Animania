import { datalist } from 'framer-motion/client'
import {useState, useEffect, } from 'react'

function useApi(url) {

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [error, setError] = useState(false)
  const [parentData, setParentData] = useState({})
  
  useEffect(() => {
    ;(async() => {  
      try{
        setError(false)
        setLoading(true)
        const response = await fetch(url)
        const dataList = await response.json()
        setData(dataList.data)
        setParentData(dataList);
        // console.log(dataList.data)
        
        setLoading(false)
      }catch(error) {
        setError(true)
        console.error('server error', error)
        setLoading(false)
      }
    })()
      
  },[url])

  return { data, loading, error, parentData}
}

export default useApi