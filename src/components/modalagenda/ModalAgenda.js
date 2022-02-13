import style from './ModalAgenda.module.css'

function ModalAgenda({ data, hora, status, local, nome, onClick, onCancel }) {
  return (
    <div className={style.container}>
      <div className={style.backDrop} />
      <div className={style.modalContent}>
        <h1 className={style.title}>Comprovante de agendamento</h1>
        <div className={style.initialInformation}>
          <h2>
            {data} - {hora}
          </h2>
          <h2 style={{ color: '#20D5AB' }}>{status}</h2>
        </div>
        <div className={style.mainInformation}>
          <h3>Orientações</h3>
          <ul className={style.informationList}>
            <li>
              Caso sejam informados dados falsos relacionados ao seu
              agendamento, ele poderá ser cancelado a critério do vacinador ou
              supervisor da sala de vacina (Art. 299 - Código Penal)
            </li>
            <li>
              Você poderá cancelar seu agendamento com até 24h de antecedência.
              Em caso de não comparecimento, um novo agendamento será permitido
              após 48h do agendamento anterior.
            </li>
            <li>
              O horário de agendamento poderá sofrer alterações, caso surjam
              problemas logísticos identificados pelo supervisor da sala de
              vacina.
            </li>
          </ul>
        </div>
        <div className={style.finalInformation}>
          <p style={{ fontWeight: 'bold' }}>
            Cidadão: <span style={{ fontWeight: 'normal' }}>{nome}</span>
          </p>
          <p style={{ fontWeight: 'bold' }}>
            Localização: <span style={{ fontWeight: 'normal' }}>{local}</span>
          </p>
        </div>
        <div className={style.buttonContainer}>
          <button className={style.cancelButton} onClick={onCancel}>
            Cancelar Agendamento
          </button>
          <button onClick={onClick} className={style.closeButton}>
            Fechar
          </button>
        </div>
      </div>
    </div>
  )
}

export default ModalAgenda
