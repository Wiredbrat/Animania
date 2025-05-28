import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {DetailPage, Home, List, TopRated, MostPopular, Airing, Trending, Movies, Upcoming} from './Importer.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider,} from 'react-router'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path="/" element={<Home/>}/> 
      <Route path='/more' element={<List/>}/>
      <Route path={`/anime/:id_num`} element={<DetailPage/>}/>
      <Route path={`/anime/top-rated`} element={<TopRated/>}/> 
      <Route path={`/anime/popular`} element={<MostPopular/>}/> 
      <Route path={`/anime/airing`} element={<Airing/>}/> 
      <Route path={`/anime/trending`} element={<Trending/>}/> 
      <Route path={`/anime/top-movies`} element={<Movies/>}/>
      <Route path={`/anime/upcoming-anime`} element={<Upcoming/>}/>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
    {/* <App /> */}
  </StrictMode>
)
