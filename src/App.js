import './App.css'
import Router from './routes/Router'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import UserContextProvider from './contexts/userContext'
import { Context } from './contexts/userContext'
import { useContext, useEffect } from 'react'
import jwtDecode from 'jwt-decode'

function App() {
  const token = localStorage.getItem('token')
  const { user, changeUser } = useContext(Context)

  useEffect(() => {
    if (!user && token) {
      const userDecode = jwtDecode(token)
      changeUser(userDecode)
    }
  }, [token, user])

  return (
    <UserContextProvider>
      <Router />
      <ToastContainer />
    </UserContextProvider>
  )
}

export default App
