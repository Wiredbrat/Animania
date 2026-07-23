import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { apiRoutes } from '../api/api'
import toast from 'react-hot-toast'
import { AuthContext } from '../context/AuthContext'

export function User() {
  // const [userInfo, setUserInfo] = useState();
  const { userData } = useContext(AuthContext);
  const userDataInString = JSON.stringify(userData)
  console.log(userDataInString)
  // useEffect(() => {
  //   ;(async() => {
  //     try {
  //     const userInformation = await axios.get(apiRoutes.userInfo, {withCredentials: true})
      
  //     if(userInformation.status === 200) {
  //       console.log(userInformation)
  //       setUserInfo(userInformation.data)
  //     }
  //     } catch (error) {
  //       toast.error(error.message)
  //     } finally {
  //       console.log(userInfo)
  //     }
  //   })()

  // }, [])

  return (
    <div className="r">
      hello 
    </div>
  )
}

