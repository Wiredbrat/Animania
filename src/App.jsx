import React from "react"
import {Searchbar, Header, Home, Footer} from "./Importer"
import { Outlet } from "react-router"
import { AnimeProvider } from "./context/AnimeContext"

function App() {
 
  return (
    <AnimeProvider>
      <div className="bg-zinc-900 h-max w-full flex flex-col items-center font-poppins ">
        <Header/>
        <Outlet/>
        <Footer/>
      </div>
    </AnimeProvider>
  )
}

export default App
