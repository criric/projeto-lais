import UserLayout from '../../layouts/userLayouts/UserLayouts'
import Api from '../../services/Api'
import style from './User.module.css'
import filter from '../../assets/Icon awesome-filter.svg'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { format } from 'date-fns'
function User() {
  const [index, setIndex] = useState(1)
  const [campanhas, setCampanhas] = useState([])
  const [grupos, setGrupos] = useState([])
  const [disponibilidades, setDisponibilidades] = useState([])
  const [datas, setDatas] = useState([])
  const [municipios, setMunicipios] = useState([])

  const getAgendamentos = async () => {
    try {
      const response = Api.axios.get('/agendamento-disponibilidade')
      console.log(response)
    } catch (error) {
      toast.error(error.response.data)
    }
  }

  const getCampanha = async () => {
    try {
      const response = await Api.axios.get('/campanha')
      setCampanhas(response.data)
    } catch (error) {
      toast.error(error.response.data)
    }
  }

  const getGrupos = async () => {
    try {
      const response = await Api.axios.get('/grupos-atendimentos')
      setGrupos(response.data)
    } catch (error) {
      toast.error(error.response.data)
    }
  }

  const getDisponibilidade = async () => {
    try {
      const response = await Api.axios.get('/agendamento-disponibilidade')

      const disponibilidade = response.data.reduce(
        (acc, curr) => {
          if (!acc.municipios.includes(curr.municipio))
            acc.municipios.push(curr.municipio)

          if (!acc.datas.includes(curr.data)) acc.datas.push(curr.data)
          return acc
        },
        { municipios: [], datas: [] }
      )

      setDisponibilidades(response.data)
      setMunicipios(disponibilidade.municipios)
      setDatas(disponibilidade.datas)
    } catch (error) {
      toast.error(error.response.data)
    }
  }

  useEffect(() => {
    getCampanha()
    getGrupos()
    getDisponibilidade()
  }, [])

  const steps = [
    <div>
      <h3 className={style.title}>Meus agendamentos</h3>
      <div className={style.filterMyAgenda}>
        <div>
          <img src={filter} />
          <p>Filtrar agendamento</p>
        </div>
        <select>
          <option>Local do exame</option>
          <option>Data</option>
          <option>Horário</option>
          <option>Tipo de Exame</option>
        </select>
      </div>
    </div>,

    <div>
      <h3 className={style.title}>Agendar</h3>
      <div className={style.filter}>
        <div className={style.individualFilter}>
          <label for="tipo" className={style.filterTitle}>
            Campanha
          </label>
          <select id="tipo" className={style.select}>
            {campanhas.map(campanha => {
              return <option value={campanha.nome}>{campanha.nome}</option>
            })}
          </select>
        </div>

        <div className={style.individualFilter}>
          <label for="city" className={style.filterTitle}>
            Município
          </label>
          <select id="city" className={style.select}>
            {municipios.map(municipio => {
              return <option value={municipio}>{municipio}</option>
            })}
          </select>
        </div>

        <div className={style.individualFilter}>
          <label for="group" className={style.filterTitle}>
            Grupo de atendimento
          </label>
          <select id="group" className={style.select}>
            {grupos.map(grupo => {
              return <option value={grupo.nome}>{grupo.nome}</option>
            })}
          </select>
        </div>

        <div className={style.individualFilter}>
          <label for="date" className={style.filterTitle}>
            Data
          </label>
          <select id="date" className={style.select}>
            {datas.map(data => {
              return <option>{format(new Date(data), 'dd/MM/yyyy')}</option>
            })}
          </select>
        </div>

        <div className={style.individualFilter}>
          <label for="exam" className={style.filterTitle}>
            Tipo de exame
          </label>
          <div id="exam">
            <div className={style.inputRatio}>
              <input type="radio" id="RT" />
              <label for="RT" className={style.ratioLabel}>
                RT-PC
              </label>
            </div>
            <div className={style.inputRatio}>
              <input type="radio" id="anti" />
              <label for="anti" className={style.ratioLabel}>
                Antígeno
              </label>
            </div>
          </div>
        </div>
        <button className={style.signupButton}>Procurar</button>
      </div>
    </div>
  ]
  return <UserLayout>{steps[index]}</UserLayout>
}

export default User
