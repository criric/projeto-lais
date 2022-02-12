import UserLayout from '../../layouts/userLayouts/UserLayouts'
import Api from '../../services/Api'
import style from './Agendamentos.module.css'
import filter from '../../assets/Icon awesome-filter.svg'
import { useState, useEffect, useContext } from 'react'
import { toast } from 'react-toastify'
import { format } from 'date-fns'
import MyAgenda from '../../components/myagenda/MyAgenda'
import ReactPaginate from 'react-paginate'
import { Context } from '../../contexts/userContext'

function Agendamentos() {
  const [agendamentos, setAgendamentos] = useState([])
  const [itemPage, setItemPage] = useState()
  const { user } = useContext(Context)

  const getAgendamentos = async () => {
    try {
      const response = await Api.axios.get('/agendamentos')

      setAgendamentos(
        response.data.filter(
          prop => user.id === prop.usuario_id && prop.localizacao
        )
      )
    } catch (error) {
      toast.error(error.response.data)
    }
  }
  console.log(user)
  const renderByPagination = page => {
    const firstIndexItem = page * 4
    const pagedItem = agendamentos.slice(firstIndexItem, firstIndexItem + 4)

    setItemPage(pagedItem)
  }

  const handleCancelAgenda = async id => {
    try {
      const response = await Api.axios.patch(`/agendamentos/${id}`, {
        status: 'Cancelado'
      })
      if (response) {
        getAgendamentos()
        toast.success('Agendamento cancelado com sucesso')
      }
    } catch (error) {
      toast.error(error.response.data)
    }
  }

  useEffect(() => {
    if (agendamentos) renderByPagination(0)
  }, [agendamentos])
  useEffect(() => {
    getAgendamentos()
  }, [])
  console.log(itemPage)
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
        <div className={style.agendamentoContainer}>
          {itemPage &&
            itemPage.map(item => {
              return (
                <MyAgenda
                  data={item.data}
                  local={item.localizacao}
                  hora={item.hora}
                  status={item.status}
                  tipo={item.tipo_exame}
                  onCancel={() => handleCancelAgenda(item.id)}
                />
              )
            })}
        </div>
        <ReactPaginate
          initialPage={0}
          pageRangeDisplayed={5}
          pageCount={agendamentos.length / 4}
          onPageChange={({ selected }) => renderByPagination(selected)}
          nextLabel=">"
          previousLabel="<"
          className={style.pagination}
        />
      </div>
    </UserLayout>
  )
}

export default Agendamentos
