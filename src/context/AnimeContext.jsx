import { createContext, useState } from "react"

const AnimeContext = createContext()
export const AnimeProvider = ({children}) => {
  const [id, setId] = useState('this')
  return (
    <AnimeContext.Provider value={{setId, id}}>
      {children}
    </AnimeContext.Provider>
  )
}

export default AnimeContext