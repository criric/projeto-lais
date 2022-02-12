import { useContext, useState } from 'react'
import { Context } from '../../contexts/userContext'
import Calendar from '../../assets/Icon feather-calendar.svg'
import userPhoto from '../../assets/Elipse 1.png'
import { IconFilter, IconFolder } from '../../assets/Icons'
import style from './UserSidebar.module.css'
import { useNavigate, useLocation } from 'react-router-dom'

function UserSidebar() {
  const { user } = useContext(Context)
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <aside className={style.container}>
      <div className={style.divContainer}>
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
        <hr></hr>
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
        <button
          onClick={() => {
            localStorage.removeItem('token')
            navigate('/')
          }}
        >
          Sair
        </button>
      </div>
    </aside>
  )
}

export default UserSidebar
