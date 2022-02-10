import UserLayout from '../../layouts/userLayouts/UserLayouts'
import Api from '../../services/Api'
import style from './Agendamentos.module.css'
import filter from '../../assets/Icon awesome-filter.svg'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { format } from 'date-fns'

function Agendamentos() {
  return (
    <UserLayout>
      <div>
        <h3 className={style.title}>Meus agendamentos</h3>
        <div className={style.filterMyAgenda}>
          <p>Filtrar agendamento</p>
          <div className={style.filterTitle0}>
            <img src={filter} />
            <select className={style.filterSelect}>
              <option value="local">Local do exame</option>
              <option value="data">Data</option>
              <option value="hora">Horário</option>
              <option value="tipo">Tipo de Exame</option>
            </select>
          </div>
        </div>
      </div>
    </UserLayout>
  )
}

export default Agendamentos
