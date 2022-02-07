import { Routes, Route } from 'react-router-dom'
import Login from '../pages/login/Login'
import AuthRouter from './auth.routes'
import AsideLayouts from '../layouts/asidelayouts/AsideLayouts'

function Router() {
  return <AuthRouter path="/" exact element={<Login />} />
}
export default Router
