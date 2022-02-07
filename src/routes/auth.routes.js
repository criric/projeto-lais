import { Routes, Route } from 'react-router-dom'
import Login from '../pages/login/Login'
import AsideLayouts from '../layouts/asidelayouts/AsideLayouts'

function AuthRouter() {
  return (
    <Routes>
      <Route path="/" exact element={<Login />} />
      {/* <Route path="/graphs" exact element={<Graphs />} /> */}
    </Routes>
  )
}
export default AuthRouter
