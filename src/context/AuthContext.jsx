import axios from 'axios';
import { apiRoutes } from '../api/api.js'
import React, {createContext, useState} from 'react';
import toast from 'react-hot-toast';

const AuthContext = createContext();
export const AuthProvider = ({children}) => {
  const [ userData, setUserData ] = useState();
  const [ isAuth, setIsAuth ] = useState(false);
  const getUser = async() => {
      try {
      const user = await axios.get(apiRoutes.user, {withCredentials: true})
      if(user.status === 200) {
        toast.success('Welcome Back!')
        console.log('success')
        console.log(user)
        setIsAuth(true);
        // setUserData(user.data)
      }
    } catch (error) {
      toast.error(JSON.stringify(error.message))
    }
  }

  const userLogin = async() => {
    try {
      const user = await axios.get(apiRoutes.login, {withCredentials: true})
      if(user.status === 200) {
        toast.success('Welcome Back!')
        console.log('success')
        setUserData(user.data)
        setIsAuth(true);
      }
    } catch (error) {
      toast.error(JSON.stringify(error.message))
    }
  }

  const userLogout = async() => {
    try {
      const res = await axios.post(apiRoutes.logout, {withCredentials: true})
  
      if(res.status === '200') {
        setUserData(null);
        setIsAuth(false);
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  return (
    <AuthContext.Provider value={
      { 
        getUser,
        isAuth: isAuth,
        setIsAuth,
        userLogin,
        userLogout, 
        userData: userData, 
      }
    }>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext };
