import { useContext } from 'react'
import { Context } from '../../contexts/userContext'
import FolderIcon from '../../assets/folderIcon.png'
function UserSidebar() {
  const { user } = useContext(Context)
  console.log(user)
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
      <div>
        <button>
          <img src={FolderIcon} />
          Meus agendamentos
        </button>
        <button>Agendar</button>
      </div>
    </aside>
  )
}

export default UserSidebar
