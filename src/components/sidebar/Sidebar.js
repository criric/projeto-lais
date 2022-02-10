import style from './Sidebar.module.css'
import Calendar from '../../assets/Icon feather-calendar.svg'
import UFRN from '../../assets/g10-8.svg'
import LAIS from '../../assets/Grupo 10.svg'
import { useNavigate } from 'react-router-dom'

function Sidebar() {
  const navigate = useNavigate()
  return (
    <aside className={style.sidebar}>
      <div className={style.sidebarContainer}>
        <div className={style.information}>
          <img src={Calendar} className={style.calendar} />
          <h3 className={style.asideTitle}>Agendamento online</h3>
          <p> Rápido e segura</p>
          <div className={style.asideParag}>
            <p>Evite filas e aglomerações.</p>
            <span>O seu bem é o bem de todos</span>
          </div>
          <button
            className={style.sideButton}
            onClick={() => {
              navigate('/graphs')
            }}
          >
            TRANSPARÊNCIA
          </button>
        </div>
        <div className={style.labStyle}>
          <img src={LAIS} />
          <img src={UFRN} />
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
