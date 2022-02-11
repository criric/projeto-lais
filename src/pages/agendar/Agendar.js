import Api from '../../services/Api'
import style from './Agendar.module.css'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { format } from 'date-fns'
import UserLayout from '../../layouts/userLayouts/UserLayouts'
import ReactPaginate from 'react-paginate'
import ItemCard from '../../components/itemcard/ItemCard'
import TimeCard from '../../components/timecard/TimeCard'

function Agendar() {
  const [campanhas, setCampanhas] = useState([])
  const [grupos, setGrupos] = useState([])
  const [disponibilidades, setDisponibilidades] = useState([])
  const [datas, setDatas] = useState([])
  const [municipios, setMunicipios] = useState([])
  const [itemPage, setItemPage] = useState([])
  const [filterData, setFilterData] = useState()

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

  const renderByPagination = page => {
    const firstIndexItem = page * 3
    const pagedItem = disponibilidades.slice(firstIndexItem, firstIndexItem + 3)

    setItemPage(pagedItem)
  }

  useEffect(() => {
    if (disponibilidades) renderByPagination(0)
  }, [disponibilidades])

  const FilterCard = () => (
    <div>
      <h3 className={style.title}>Agendar</h3>
      <div className={style.filter}>
        <div className={style.individualFilter}>
          <label for="tipo" className={style.filterTitle}>
            Campanha
          </label>
          <select id="tipo" className={style.select}>
            {campanhas.map((campanha, i) => {
              return (
                <option key={i} value={campanha.nome}>
                  {campanha.nome}
                </option>
              )
            })}
          </select>
        </div>

        <div className={style.individualFilter}>
          <label for="city" className={style.filterTitle}>
            Município
          </label>
          <select id="city" className={style.select}>
            {municipios.map((municipio, i) => {
              return (
                <option key={i} value={municipio}>
                  {municipio}
                </option>
              )
            })}
          </select>
        </div>

        <div className={style.individualFilter}>
          <label for="group" className={style.filterTitle}>
            Grupo de atendimento
          </label>
          <select id="group" className={style.select}>
            {grupos.map((grupo, i) => {
              return (
                <option key={i} value={grupo.nome}>
                  {grupo.nome}
                </option>
              )
            })}
          </select>
        </div>

        <div className={style.individualFilter}>
          <label for="date" className={style.filterTitle}>
            Data
          </label>
          <select
            id="date"
            className={style.select}
            onChange={event => {
              setFilterData(event.target.value)
            }}
            value={filterData}
          >
            {datas.map((data, i) => {
              return (
                <option key={i} value={data}>
                  {format(new Date(data), 'dd/MM/yyyy')}
                </option>
              )
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
  )

  return (
    <UserLayout>
      <FilterCard />
      {itemPage.length > 0 && (
        <div>
          <div>
            <h3>
              Locais de exames
              {!!filterData &&
                ` - ${format(new Date(filterData), 'dd/MM/yyyy')}`}
            </h3>
          </div>
          <div className={style.horariosDisponiveis}>
            {itemPage.map((item, i) => (
              <ItemCard
                key={i}
                local={item.localizacao}
                camp={campanhas}
                disp={Object.entries(item.vagas)}
              >
                {Object.entries(item.vagas).map((item, j) => {
                  return <TimeCard key={j} disp={item} />
                })}
              </ItemCard>
            ))}
          </div>

          <ReactPaginate
            initialPage={0}
            pageRangeDisplayed={5}
            pageCount={disponibilidades.length / 3}
            onPageChange={({ selected }) => renderByPagination(selected)}
          />
        </div>
      )}
    </UserLayout>
  )
}

export default Agendar
