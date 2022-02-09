import './App.css'
import Router from './routes/Router'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import UserContextProvider from './contexts/userContext'
import { Context } from './contexts/userContext'
import { useContext, useEffect } from 'react'
import Api from './services/Api'
import jwtDecode from 'jwt-decode'

function App() {
  const token = localStorage.getItem('token')
  const { user, setUser } = useContext(Context)

  const getUser = async () => {
    try {
      const response = await Api.axios.get('/users')
      if (response.data) {
        const { email } = jwtDecode(token)
        setUser(response.data.find(user => email === user.email))
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (!user && token) {
      getUser()
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
