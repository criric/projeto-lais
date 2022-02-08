import { Routes, Route } from 'react-router-dom'
import Login from '../pages/login/Login'
import AuthRouter from './auth.routes'
import UserRouter from './dashbord.routes'
import User from '../pages/users/User'
import AsideLayouts from '../layouts/asidelayouts/AsideLayouts'

function Router() {
  return (
    <>
      <AuthRouter path="/" exact element={<Login />} />
      <UserRouter path="/user" exact element={<User />} />
    </>
  )
}
export default Router
