import style from './TimeCard.module.css'

function TimeCard({ disp }) {
  return (
    <div className={style.container}>
      <div className={style.timeAvaiable}>
        <span>{disp[0]}</span>
      </div>
      <div className={style.vagas}>
        <span>{disp[1]} vagas</span>
      </div>
    </div>
  )
}

export default TimeCard
