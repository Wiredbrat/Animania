import React from "react"
import {Searchbar, Header, Home} from "./Importer"
import { Outlet } from "react-router"
import { AnimeProvider } from "./context/AnimeContext"

function App() {
 
  return (
    <AnimeProvider>
      <div className="bg-slate-800 h-max w-full flex flex-col items-center font-poppins ">
        <Header/>
        <Outlet/>
      </div>
    </AnimeProvider>
  )
}

export default App
