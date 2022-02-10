import { useContext } from 'react'
import { Context } from '../../contexts/userContext'
import FolderIcon from '../../assets/folderIcon.png'
import Calendar from '../../assets/Icon feather-calendar.svg'
import userPhoto from '../../assets/Elipse 1.png'
import pencil from '../../assets/Icon material-create.svg'
import style from './UserSidebar.module.css'

function UserSidebar() {
  const { user } = useContext(Context)
  return (
    <aside>
      <div className={style.container}>
        <div className={style.iconAgenda}>
          <img src={Calendar} />
          <p>Agendamento Online</p>
        </div>
        <div className={style.userProfile}>
          <img src={userPhoto} />
          <div>
            <p className={style.welcome}>Seja bem-vindo</p>
            <p className={style.userName}>{user?.nome}</p>
          </div>
        </div>
        <div className={style.buttonContainer}>
          <button className={style.myAgenda}>
            <img src={FolderIcon} />
            Meus agendamentos
          </button>
          <button className={style.agendar}>
            <img src={pencil} />
            Agendar
          </button>
        </div>
      </div>
    </aside>
  )
}

export default UserSidebar
