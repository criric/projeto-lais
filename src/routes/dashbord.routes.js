import { Routes, Route } from 'react-router-dom'
import User from '../pages/users/User'

function UserRouter() {
  return (
    <Routes>
      <Route path="/user" exact element={<User />} />
    </Routes>
  )
}
export default UserRouter
