import { createContext, useState, useContext } from 'react'

export const Context = createContext({ user: null, setUser: () => {} })

function UserContextProvider({ children }) {
  const [user, setUser] = useState()

  return (
    <Context.Provider value={{ user, setUser }}>{children}</Context.Provider>
  )
}

export default UserContextProvider
