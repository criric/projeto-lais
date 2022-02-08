import { createContext, useState, useContext } from 'react'

export const Context = createContext({ user: null, changeUser: value => {} })

function UserContextProvider({ children }) {
  const [user, setUser] = useState()

  const changeUser = value => {
    setUser(value)
  }

  return (
    <Context.Provider value={{ user, changeUser }}>{children}</Context.Provider>
  )
}

export default UserContextProvider
