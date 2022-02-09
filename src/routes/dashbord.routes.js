import { Routes, Route } from 'react-router-dom'
import User from '../pages/users/User'

function UserRouter() {
  console.log('a')
  return (
    <Routes>
      <Route path="/user" exact element={<User />} />
    </Routes>
  )
}
export default UserRouter
