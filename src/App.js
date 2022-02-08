import logo from './logo.svg'
import './App.css'
import Router from './routes/Router'
import Sidebar from './components/sidebar/Sidebar'
import Login from './pages/login/Login'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <>
      <Router />
      <ToastContainer />
    </>
  )
}

export default App
