import style from './UserLayouts.module.css'
import UserSidebar from '../../components/userSidebar/UserSidebar'

function UserLayouts({ children }) {
  return (
    <div>
      <UserSidebar />
      <div>{children}</div>
    </div>
  )
}

export default UserLayouts
