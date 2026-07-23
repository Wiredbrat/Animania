import React, { useContext } from "react"
import {Searchbar, Header, Home, Footer} from "./Importer"
import { Outlet } from "react-router"
import { AnimeProvider } from "./context/AnimeContext"
import { AuthContext, AuthProvider } from "./context/AuthContext"

function App() {
  return (
    <AuthProvider>
      <AnimeProvider>
        <div className="bg-zinc-900 w-full flex flex-col justify-between items-center font-poppins min-h-[100vh]">
          <Header/>
          <Outlet/>
          <Footer/>
        </div>
      </AnimeProvider>
    </AuthProvider>
  )
}

export default App
