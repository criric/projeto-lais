import style from './TimeCard.module.css'

function TimeCard({ disp, onClick, active }) {
  return (
    <div
      className={style.container}
      onClick={onClick}
      style={{ borderColor: active && '#F72585' }}
    >
      <div
        className={style.timeAvaiable}
        style={{ color: active && '#F72585' }}
      >
        <span>{disp[0]}</span>
      </div>
      <div
        className={style.vagas}
        style={{ backgroundColor: active && '#F72585' }}
      >
        <span>{disp[1]} vagas</span>
      </div>
    </div>
  )
}

export default TimeCard
