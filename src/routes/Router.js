import Login from '../pages/login/Login'
import AuthRouter from './auth.routes'
import UserRouter from './dashbord.routes'
import User from '../pages/users/User'
import { Context } from '../contexts/userContext'
import { useContext, useEffect } from 'react'
import Api from '../services/Api'
import jwtDecode from 'jwt-decode'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function Router() {
  const token = localStorage.getItem('token')
  const { user, setUser } = useContext(Context)
  const navigate = useNavigate()

  const getUser = async () => {
    try {
      const response = await Api.axios.get('/users')
      if (response.data) {
        const { email } = jwtDecode(token)
        setUser(response.data.find(user => email === user.email))
        navigate('/user')
      }
    } catch (error) {
      toast.error(error.response.data)
    }
  }
  useEffect(() => {
    if (!user && token) {
      getUser()
    }
  }, [token, user])

  return <>{user ? <UserRouter /> : <AuthRouter />}</>
}
export default Router
