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
  return (
    <UserContextProvider>
      <Router />
      <ToastContainer />
    </UserContextProvider>
  )
}

export default App
