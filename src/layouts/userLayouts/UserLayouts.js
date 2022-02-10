import style from './UserLayouts.module.css'
import UserSidebar from '../../components/userSidebar/UserSidebar'

function UserLayouts({ children }) {
  return (
    <div className={style.container}>
      <UserSidebar />
      <div className={style.content}>{children}</div>
    </div>
  )
}

export default UserLayouts
