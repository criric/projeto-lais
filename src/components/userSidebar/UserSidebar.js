import { useContext } from 'react'
import { Context } from '../../contexts/userContext'

function UserSidebar() {
  const { user } = useContext(Context)
  return (
    <aside>
      <div>
        <img></img>
        <p>Agendamento Online</p>
      </div>
      <div>
        <img></img>
        <p>Seja bem-vindo</p>
        <p>{user?.nome}</p>
      </div>
    </aside>
  )
}

export default UserSidebar
