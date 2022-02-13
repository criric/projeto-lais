import { useContext, useState } from 'react'
import { Context } from '../../contexts/userContext'
import userPhoto from '../../assets/Elipse 1.png'
import {
  IconFilter,
  IconFolder,
  ArrowDown,
  Profile,
  LogOut,
  Agenda
} from '../../assets/Icons'
import style from './UserSidebar.module.css'
import { useNavigate, useLocation } from 'react-router-dom'

function UserSidebar() {
  const [profile, setProfile] = useState(false)
  const { user } = useContext(Context)
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <aside
      className={style.container}
      onMouseLeave={() => {
        const timeOut = setTimeout(() => {
          setProfile(false)
          clearTimeout(timeOut)
        }, 2000)
      }}
    >
      <div className={style.divContainer}>
        <div className={style.iconAgenda}>
          <Agenda />
          <p>Agendamento Online</p>
        </div>
        <div className={style.userProfile}>
          <img src={userPhoto} />
          <div className={style.profile}>
            <div>
              <p className={style.welcome}>Seja bem-vindo</p>
              <p className={style.userName}>{user?.nome}</p>
            </div>
            <div
              className={style.arrow}
              onMouseEnter={() => !profile && setProfile(true)}
            >
              <ArrowDown />
            </div>
          </div>
        </div>

        <div className={style.buttonContainer}>
          <button
            className={style.myAgenda}
            onClick={() => {
              navigate('/agendamentos')
            }}
            style={{
              backgroundColor:
                location.pathname === '/agendamentos' && '#f72585',

              color: location.pathname === '/agendamentos' && 'white'
            }}
          >
            <IconFolder
              color={
                location.pathname === '/agendamentos' ? 'white' : '#f72585'
              }
            />
            Meus agendamentos
          </button>
          <button
            className={style.agendar}
            onClick={() => {
              navigate('/agendar')
            }}
            style={{
              backgroundColor: location.pathname === '/agendar' && '#f72585',

              color: location.pathname === '/agendar' && 'white'
            }}
          >
            <IconFilter
              color={location.pathname === '/agendar' ? 'white' : '#f72585'}
            />
            Agendar
          </button>
        </div>
        {profile && (
          <div
            className={style.arrowMenu}
            onMouseEnter={() => {
              setProfile(true)
            }}
          >
            <button className={style.profileButton}>
              <Profile />
              Meu perfil
            </button>
            <button
              onClick={() => {
                localStorage.removeItem('token')
                navigate('/')
              }}
              className={style.profileButton}
            >
              <LogOut />
              Sair
            </button>
          </div>
        )}
      </div>
    </aside>
  )
}

export default UserSidebar
