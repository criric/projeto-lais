import { Vacina, Calendar, Clock, MapMarker } from '../../assets/Icons'
import style from './MyAgenda.module.css'

function MyAgenda({ data, local, hora, status, tipo, onCancel }) {
  return (
    <div className={style.container}>
      <div className={style.initialInformation}>
        <div className={style.examType}>
          <Vacina />
          <div>
            <h6 className={style.type}>Tipo de exame </h6>
            <h6 className={style.specificType}>{tipo}</h6>
          </div>
        </div>
        <h6>{status}</h6>
      </div>
      <div className={style.information}>
        <div className={style.local}>
          <MapMarker />
          <p>{local}</p>
        </div>
        <div className={style.timeData}>
          <div className={style.calendar}>
            <Calendar />
            <p>{data}</p>
          </div>
          <div className={style.clock}>
            <Clock />
            <p>{hora}</p>
          </div>
        </div>
      </div>
      {status === 'AGENDADO' && (
        <div className={style.buttons}>
          <button className={style.detailButton}>Detalhes</button>
          <button className={style.cancelButton} onClick={onCancel}>
            Cancelar
          </button>
        </div>
      )}
    </div>
  )
}

export default MyAgenda
