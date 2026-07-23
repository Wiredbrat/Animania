import { Loader2, LucideEye, LucideEyeClosed } from "lucide-react";
import { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import toast, { Toaster } from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiRoutes } from "../api/api.js";
import axios from "axios";
import { AuthContext } from "../context/AuthContext.jsx";

export default function LoginPage({display='false', hidden}) {
  const {userLogin, setIsAuth, isAuth} = useContext(AuthContext);
  const [ isPasswordVisible, setIsPasswordVisible ] = useState(false);
  const [ isLogin, setIsLogin ] = useState(true);
  const [ isLoading, setIsLoading ] = useState(false);

  const userSignupSchema = z.object({
    username: z.string().trim().min(3, 'Enter valid username '),
    email: z.email('Enter a valid mail id.'),
    password: z.string().min(6, 'Password is too short')
  })

  const userLoginSchema = z.object({
    username: z.string().trim().min(3, 'Enter valid username '),
    password: z.string().min(6, 'Password is too short')
  })

  const {
    register, 
    handleSubmit, 
    watch,
    reset,
    formState: {errors}
  } = useForm({
    resolver: zodResolver(isLogin ? userLoginSchema : userSignupSchema),
  })
  const controller = new AbortController();

  const onSubmit = async (data, e) => {
    console.log(data);
    try {
      setIsLoading(true)
      let response;
      if(isLogin) {
        // response = await axios.post(apiRoutes.login, data, {withCredentials: true, signal: controller.signal})
        response = userLogin();
      }else{
        response = await axios.post(apiRoutes.signUp, data, {withCredentials: true})
      }
      console.log(response);

      if(response.data.statusCode === 201) {
        console.log('user successful')
        !isLogin && setIsLogin(true);
        !isAuth && setIsAuth(true)
        reset();
        hidden();
      }else if(response.data.statusCode === 200) {
        console.log('user successfully login')
        !isLogin && setIsLogin(true);
        !isAuth && setIsAuth(true)       
        reset();
        hidden();
      }
    }catch (error) {
      console.log('Error: ', error)
      if(error.status === 409) {
        toast.error('User already Exist')
      }
    }finally {
      setIsLoading(false);
    }
  }

  const handleLoginStatus = (e) => {
    e.preventDefault();
    setIsLogin(prev => !prev);
    isLoading && setIsLoading(false);
  }

  const handlePasswordVisiblity = () => {
    setIsPasswordVisible(prev => !prev);
  }

  useEffect(() => {
    Object.values(errors).forEach((error) => {
      toast.error(error.message);
    });
  }, [errors]);

  // CLEAN UP FUNCTION FOR LOGIN COMPONENT
  useEffect(() => {
    return () => {
      reset();
      controller.abort()
      setIsLoading(false);
      toast.dismiss();
    }
  },[display])

  return (
    <>
      <div 
        className={`${display ? 'fixed' : 'hidden'} z-[1000] w-screen h-screen bg-gray-900 bg-opacity-45 backdrop-blur-sm`}
        onClick={() => hidden()}
      ></div>
      <div
        className={`${display ? 'fixed' : 'hidden'} z-[1000] max-w-md w-full flex justify-center left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] bg-gray-700 py-6 rounded-2xl bg-opacity-20 backdrop-blur-md `}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`flex flex-col place-items-center w-[90%] bg-white bg-opacity-20 rounded-md backdrop-blur-sm backdrop-filter p-5 pb-8 gap-2 text-white ${isLogin ? " [transform:rotateX(360deg)] duration-500 opacity-1" :'duration-500'}`}
        >
          <label htmlFor="" className="text-2xl text-white">{isLogin? 'Login': 'Sign Up'}</label>
          <input
            type="text"
            placeholder="username"
            {...register("username",{required: true})} 
            className="w-full outline-none px-2 py-1 rounded bg-transparent border  placeholder-slate-300" 
            autoComplete="off"
          />
          {errors.username && <></>}

          <input type="text" 
            placeholder="email"
            {...register("email")}
            className={`w-full outline-none px-2 py-1 rounded bg-transparent border ${isLogin ? "hidden" : ""} duration-150 placeholder-slate-300`} 
            autoComplete="off"
          />
          {errors.email && <></>}

          <span 
            className={`w-full outline-none px-2 py-1 rounded flex justify-between bg-transparent border`}
          >
            <input
              type={`${isPasswordVisible? 'text':'password'}`} 
              placeholder="password"
              {...register("password", )}
              className="outline-none w-[90%] bg-transparent placeholder-slate-300" 
              onCopy={(e) => {e.preventDefault()}}
              autoComplete="off"
            />
            <span onClick={handlePasswordVisiblity}>
              {isPasswordVisible? <LucideEyeClosed/>: <LucideEye/>}
            </span>
          </span>
          {errors.password && <></>}

          <input
            type="submit"
            disabled={isLoading}
            value={isLogin? `${isLoading ? 'Loading...' : 'Login'}`:`${isLoading ? 'Loading...' : 'Sign Up'}`}
            className="w-full outline-none px-2 py-1 rounded bg-blue-500 hover:bg-blue-600 hover:scale-[1.01] active:scale-[1] cursor-pointer disabled:opacity-50"
          />

          <span className="text-white">{isLogin? 'new user?':'already registerd?'}</span>
          <button 
            onClick={handleLoginStatus}
            className="py-1 px-4 bg-gray-800 text-blue-500 rounded"
            >
            <span>
              {isLogin ? 'Sign Up' : 'Login' }
            </span>
          </button>
        </form>
      </div>
      <Toaster position="bottom-center" toastOptions={{ duration: 1000}}/>
    </>
  )
}